import { restoreStorage } from '@konomi-app/kintone-utilities';
import { OPENAI_MODELS } from './static';
import { PLUGIN_ID } from './global';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.LatestStorage => ({
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
export const migrateConfig = (storage: kintone.plugin.Storage): kintone.plugin.LatestStorage => {
  const { version } = storage;
  switch (version) {
    case undefined:
    case 1:
      return {
        ...storage,
        version: 4,
        enablesAnimation: false,
        enablesEnter: false,
        enablesShiftEnter: false,
        assistants: [createNewAiAssistant()],
      };
    case 2:
      return {
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
      };
    case 3:
      return {
        ...storage,
        version: 4,
        assistants: storage.assistants.map((assistant) => ({ ...assistant, examples: [''] })),
      };
    default:
      //@ts-ignore
      return {
        ...storage,
        version: 4,
        assistants: storage.assistants.map((assistant) => ({
          //@ts-ignore
          maxTokens: 0,
          ...assistant,
        })),
      };
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): kintone.plugin.LatestStorage => {
  const config = restoreStorage<kintone.plugin.Storage>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const createNewAiAssistant = (): kintone.plugin.AiAssistantProps => ({
  name: '',
  description: '',
  aiModel: OPENAI_MODELS[0],
  aiIcon: '',
  temperature: 0.7,
  systemPrompt: '',
  maxTokens: 0,
  examples: [''],
});
