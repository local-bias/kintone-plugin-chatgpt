import { EndpointAdapter } from '../endpoint-adapter';
import { AiProviderType } from '@/schema/plugin-config';
import { OpenAIAdapter } from './openai-adapter';
import { OpenRouterAdapter } from './openrouter-adapter';

/**
 * エンドポイントアダプタを生成するファクトリー関数
 * プラグインモード(OpenSource/Proprietary)とプロバイダータイプに基づいて
 * 適切なアダプタを返す
 *
 * @param providerType プロバイダータイプ ('openai' | 'openrouter')
 * @returns 適切なエンドポイントアダプタインスタンス
 */
export function createEndpointAdapter(providerType: AiProviderType = 'openai'): EndpointAdapter {
  // OpenSourceモードの場合はproviderTypeに基づいてアダプタを選択
  switch (providerType) {
    case 'openai':
      return new OpenAIAdapter();
    case 'openrouter':
      return new OpenRouterAdapter();
    default:
      // デフォルトはOpenAI
      return new OpenAIAdapter();
  }
}

// 各アダプタをエクスポート
export { OpenAIAdapter } from './openai-adapter';
export { OpenRouterAdapter } from './openrouter-adapter';
