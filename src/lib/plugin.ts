import { restoreStorage } from '@konomi-app/kintone-utilities';
import { OPENAI_MODELS } from './static';
import { PLUGIN_ID } from './global';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.Storage => ({
  version: 1,
  aiModel: OPENAI_MODELS[0],
  viewId: '',
  outputAppId: '',
  outputKeyFieldCode: '',
  outputContentFieldCode: '',
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param storage 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (storage: kintone.plugin.Storage): kintone.plugin.Storage => {
  const { version } = storage;
  switch (version) {
    case 1:
      return storage;
    default:
      //@ts-ignore
      return { version: 1, ...storage };
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): kintone.plugin.Storage => {
  const config = restoreStorage<kintone.plugin.Storage>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};
