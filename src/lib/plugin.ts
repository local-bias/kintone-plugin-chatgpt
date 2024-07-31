import { restoreStorage } from '@konomi-app/kintone-utilities';
import { OPENAI_MODELS } from './static';
import { PLUGIN_ID } from './global';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 4,
  viewId: '',
  outputAppId: '',
  outputKeyFieldCode: '',
  outputContentFieldCode: '',
  logAppId: '',
  logKeyFieldCode: '',
  logContentFieldCode: '',
  enablesAnimation: false,
  enablesEnter: false,
  enablesShiftEnter: false,
  assistants: [createNewAiAssistant()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param storage 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (storage: Plugin.AnyConfig): Plugin.Config => {
  const { version } = storage;
  switch (version) {
    case undefined:
    case 1:
      return migrateConfig({
        ...storage,
        version: 4,
        enablesAnimation: false,
        enablesEnter: false,
        enablesShiftEnter: false,
        assistants: [createNewAiAssistant()],
      });
    case 2:
      return migrateConfig({
        ...storage,
        version: 4,
        enablesAnimation: false,
        enablesEnter: false,
        enablesShiftEnter: false,
        assistants: storage.assistants.map((assistant) => ({
          //@ts-ignore
          maxTokens: 0,
          ...assistant,
          examples: [''],
        })),
      });
    case 3:
      return migrateConfig({
        ...storage,
        version: 4,
        assistants: storage.assistants.map((assistant) => ({ ...assistant, examples: [''] })),
      });
    case 4:
    default: // `default` -> `config.js`と`desktop.js`のバージョンが一致していない場合に通る可能性があるため必要
      return storage;
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const createNewAiAssistant = (): Plugin.Condition => ({
  name: '',
  description: '',
  aiModel: OPENAI_MODELS[0],
  aiIcon: '',
  temperature: 0.7,
  systemPrompt: '',
  maxTokens: 0,
  examples: [''],
});
