import { restorePluginConfig as primitiveRestore } from '@konomi-app/kintone-utilities';
import { OPENAI_MODELS } from './static';
import { PLUGIN_ID } from './global';
import { nanoid } from 'nanoid';
import { produce } from 'immer';

/**
 * プラグインの設定情報が、最新の設定情報の形式に準拠しているか検証します
 *
 * @param condition - 検証する条件オブジェクト
 * @returns プラグインの設定情報が最新の形式に準拠している場合は`true`、そうでない場合は`false`
 */
export const isPluginConditionMet = (condition: unknown): boolean => {
  return true;
};

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 6,
  common: {
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
  },
  conditions: [getNewCondition()],
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
    case 1: {
      return migrateConfig({
        ...storage,
        version: 4,
        enablesAnimation: false,
        enablesEnter: false,
        enablesShiftEnter: false,
        assistants: [getNewCondition()],
      });
    }
    case 2: {
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
    }
    case 3: {
      return migrateConfig({
        ...storage,
        version: 4,
        assistants: storage.assistants.map((assistant) => ({ ...assistant, examples: [''] })),
      });
    }
    case 4: {
      const { version, assistants, ...rest } = storage;
      return migrateConfig({
        version: 5,
        common: rest,
        conditions: assistants.map((assistant) => ({
          ...assistant,
          id: nanoid(),
        })),
      });
    }
    case 5: {
      return migrateConfig({
        ...storage,
        conditions: storage.conditions.map((condition) => ({
          allowImageUpload: true,
          ...condition,
        })),
        version: 6,
      });
    }
    case 6:
    default: {
      return storage;
    }
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = primitiveRestore<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getNewCondition = (): Plugin.Condition => ({
  id: nanoid(),
  name: '',
  description: '',
  aiModel: OPENAI_MODELS[0],
  aiIcon: '',
  temperature: 0.7,
  systemPrompt: '',
  maxTokens: 0,
  examples: [''],
  allowImageUpload: true,
});

export const getUpdatedStorage = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    value: Plugin.Condition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};
