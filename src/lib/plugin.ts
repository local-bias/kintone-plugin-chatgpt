import { OPENAI_MODELS } from './static';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.Storage => ({
  aiModel: OPENAI_MODELS[0],
  viewId: '',
  outputAppId: '',
  outputContentFieldCode: '',
});
