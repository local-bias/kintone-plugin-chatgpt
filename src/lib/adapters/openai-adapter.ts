import {
  EndpointAdapter,
  ChatCompletionRequest,
  ChatCompletionResponse,
  hasImageContent,
  isO1SeriesModel,
} from '../endpoint-adapter';
import { OPENAI_ENDPOINT, ChatMessage } from '../static';
import { ReasoningEffortType } from '@/schema/ai';
import { nanoid } from 'nanoid';

/**
 * Response API用のコンテンツパート型定義
 */
type ResponseApiTextContentPart = {
  type: 'input_text';
  text: string;
};

type ResponseApiImageContentPart = {
  type: 'input_image';
  image_url: string;
};

type ResponseApiContentPart = ResponseApiTextContentPart | ResponseApiImageContentPart;

type ResponseApiMessage = {
  role: string;
  content?: string | ResponseApiContentPart[];
};

/**
 * OpenAI Response API 用のアダプタ
 * OpenAIの/v1/responsesエンドポイント専用
 */
export class OpenAIAdapter implements EndpointAdapter {
  readonly endpoint = OPENAI_ENDPOINT;

  buildRequestPayload(request: ChatCompletionRequest): Record<string, unknown> {
    const {
      model,
      temperature,
      maxTokens,
      messages,
      systemPrompt,
      verbosity,
      reasoningEffort,
      webSearchEnabled,
      promptId,
    } = request;

    let max_tokens = maxTokens === 0 ? undefined : maxTokens;

    // 画像が含まれている場合はmax_tokensの指定が必須
    if (!max_tokens && hasImageContent(messages)) {
      max_tokens = 2048;
    }

    // システムプロンプトが指定されている場合は先頭に追加
    const messagesWithSystem: ChatMessage[] = systemPrompt
      ? [
          {
            id: nanoid(),
            role: 'system' as const,
            content: systemPrompt,
          },
          ...messages,
        ]
      : messages;

    // Response API用のメッセージ形式に変換
    const responseInputMessages: ResponseApiMessage[] = messagesWithSystem.map(
      ({ id, ...rest }) => ({
        ...rest,
        content: this.convertContentForResponses(rest.content),
      })
    );

    const payload: Record<string, unknown> = {
      model,
      temperature,
      max_output_tokens: max_tokens,
      input: responseInputMessages,
      text: {
        format: {
          type: 'text',
        },
        verbosity: verbosity === 'model-default' ? undefined : verbosity,
      },
    };

    // Prompt IDが設定されている場合、promptオブジェクトを追加
    if (promptId) {
      payload.prompt = {
        id: promptId,
      };
    }

    // Web検索の設定
    if (webSearchEnabled) {
      payload.tools = [
        {
          type: 'web_search',
          user_location: {
            type: 'approximate',
            country: 'JP',
            city: 'Tokyo',
            region: 'Tokyo',
          },
        },
      ];
    }

    // Reasoning effortの設定
    const normalizedReasoningEffort = this.normalizeReasoningEffort(reasoningEffort);
    if (normalizedReasoningEffort) {
      payload.reasoning = {
        effort: normalizedReasoningEffort,
      };
    }

    // O1シリーズモデルの場合はtemperatureを削除
    if (isO1SeriesModel(model)) {
      delete payload.temperature;
    }

    return payload;
  }

  async parseResponse(response: Response, responseBody: any): Promise<ChatCompletionResponse> {
    if (response.status !== 200) {
      this.handleError(response, responseBody);
    }

    // Response APIのレスポンスを標準的なChat Completion形式に変換
    return responseBody as ChatCompletionResponse;
  }

  handleError(response: Response, responseBody: any): never {
    const errorResponse = responseBody as any;
    if (errorResponse?.error?.message) {
      throw new Error(errorResponse.error.message);
    }
    throw new Error(
      'APIの呼び出しに失敗しました。再度実行しても失敗する場合は、管理者にお問い合わせください。'
    );
  }

  /**
   * ChatMessageのcontentをResponse API用の形式に変換する
   */
  private convertContentForResponses(
    content: ChatMessage['content']
  ): ResponseApiMessage['content'] {
    if (!content) {
      return undefined;
    }
    if (typeof content === 'string') {
      return content;
    }
    return content.map<ResponseApiContentPart>((part) => {
      if (part.type === 'text') {
        return { type: 'input_text', text: part.text };
      }
      const imageUrl = typeof part.image_url === 'string' ? part.image_url : part.image_url.url;
      if (!imageUrl) {
        return { type: 'input_text', text: '[image missing]' };
      }
      return {
        type: 'input_image',
        image_url: imageUrl,
      };
    });
  }

  /**
   * OpenAI用にreasoning_effortを正規化する
   */
  private normalizeReasoningEffort(value?: ReasoningEffortType): string | undefined {
    if (!value || value === 'model-default' || value === 'none') {
      return undefined;
    }
    if (value === 'minimal') {
      return 'low';
    }
    if (value === 'low' || value === 'medium' || value === 'high') {
      return value;
    }
    return undefined;
  }
}
