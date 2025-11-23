import {
  EndpointAdapter,
  ChatCompletionRequest,
  ChatCompletionResponse,
  stripMessageIds,
  hasImageContent,
  isO1SeriesModel,
} from '../endpoint-adapter';
import { OPENROUTER_CHAT_COMPLETION_ENDPOINT } from '../static';
import { nanoid } from 'nanoid';

/**
 * OpenRouter エンドポイント用のアダプタ
 */
export class OpenRouterAdapter implements EndpointAdapter {
  readonly endpoint = OPENROUTER_CHAT_COMPLETION_ENDPOINT;

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
    } = request;

    let max_tokens = maxTokens === 0 ? undefined : maxTokens;

    // 画像が含まれている場合はmax_tokensの指定が必須
    if (!max_tokens && hasImageContent(messages)) {
      max_tokens = 2048;
    }

    // システムプロンプトが指定されている場合は先頭に追加
    const messagesWithSystem = systemPrompt
      ? [
          {
            id: nanoid(),
            role: 'system' as const,
            content: systemPrompt,
          },
          ...messages,
        ]
      : messages;

    const payload: Record<string, unknown> = {
      model,
      temperature,
      max_completion_tokens: max_tokens,
      messages: stripMessageIds(messagesWithSystem),
      response_format: {
        type: 'text',
      },
      verbosity: verbosity === 'model-default' ? undefined : verbosity,
      reasoning_effort: reasoningEffort === 'model-default' ? undefined : reasoningEffort,
    };

    // Web検索の設定
    if (webSearchEnabled) {
      payload.plugins = payload.plugins || [];
      if (Array.isArray(payload.plugins)) {
        payload.plugins.push({ id: "web" });
      }
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

    // OpenRouterのレスポンスは標準的なChat Completion形式
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
}
