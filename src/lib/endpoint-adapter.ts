import { ChatMessage } from './static';
import { ReasoningEffortType, VerbosityType } from '@/schema/ai';
import { AiProviderType } from '@/schema/plugin-config';

/**
 * 統一されたリクエストパラメータ
 */
export type ChatCompletionRequest = {
  model: string;
  temperature: number;
  maxTokens: number;
  messages: ChatMessage[];
  systemPrompt?: string;
  verbosity?: VerbosityType;
  reasoningEffort?: ReasoningEffortType;
  webSearchEnabled?: boolean;
  promptId?: string;
};

/**
 * 統一されたレスポンス型
 */
export type ChatCompletionResponse = {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  model?: string;
};

/**
 * エンドポイント設定
 */
export type EndpointConfig = {
  endpoint: string;
  headers?: Record<string, string>;
};

/**
 * エンドポイントアダプタのインターフェース
 * 各エンドポイント(OpenAI, OpenRouter, Unlimited)の差異を吸収する
 */
export interface EndpointAdapter {
  /**
   * エンドポイントURL
   */
  readonly endpoint: string;

  /**
   * リクエストペイロードを構築する
   * @param request 統一されたリクエストパラメータ
   * @returns エンドポイント固有のペイロード
   */
  buildRequestPayload(request: ChatCompletionRequest): Record<string, unknown>;

  /**
   * レスポンスをパースする
   * @param response APIレスポンス
   * @returns 統一されたレスポンス形式
   */
  parseResponse(response: Response, responseBody: any): Promise<ChatCompletionResponse>;

  /**
   * エラーをハンドリングする
   * @param response エラーレスポンス
   * @param responseBody レスポンスボディ
   */
  handleError(response: Response, responseBody: any): never;
}

/**
 * メッセージコンテンツからIDを除去する
 */
export const stripMessageIds = (messages: ChatMessage[]): Omit<ChatMessage, 'id'>[] => {
  return messages.map(({ id, ...rest }) => rest);
};

/**
 * 画像が含まれているかチェックする
 */
export const hasImageContent = (messages: ChatMessage[]): boolean => {
  return messages.some(
    (m) => Array.isArray(m.content) && m.content.some((c) => c.type === 'image_url')
  );
};

/**
 * O1シリーズモデルかどうかを判定する
 */
export const isO1SeriesModel = (model: string): boolean => {
  return model.startsWith('o1') || model.startsWith('o3') || model.startsWith('o4');
};
