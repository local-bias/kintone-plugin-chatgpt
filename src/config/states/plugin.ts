import { t } from '@/lib/i18n';
import { createConfig, migrateConfig, restorePluginConfig } from '@/lib/plugin';
import { OPENAI_ENDPOINT_ROOT, PLUGIN_NAME, VIEW_ROOT_ID } from '@/lib/static';
import { handleLoadingEndAtom, handleLoadingStartAtom } from '@/lib/w-ui';
import {
  getViews,
  onFileLoad,
  storePluginConfig,
  updateViews,
} from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { atom } from 'jotai';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, ReactNode, SetStateAction } from 'react';
import invariant from 'tiny-invariant';
import { usePluginAtoms } from './w-plugin';
import { atomWithDefault } from 'jotai/utils';
import { currentAppIdAtom } from './kintone';
import { GUEST_SPACE_ID, isDev } from '@/lib/global';

export const pluginConfigAtom = atom<Plugin.Config>(restorePluginConfig());

export const handlePluginConfigResetAtom = atom(null, (_, set) => {
  set(pluginConfigAtom, createConfig());
  enqueueSnackbar(t('common.config.toast.reset'), { variant: 'success' });
});

export const {
  pluginConditionsAtom,
  selectedConditionAtom,
  hasMultipleConditionsAtom,
  selectedConditionIdAtom,
  commonConfigAtom,
  getConditionPropertyAtom,
  isConditionIdUnselectedAtom,
} = usePluginAtoms(pluginConfigAtom, {
  enableCommonCondition: true,
});

export const apiKeyState = atomWithDefault<string>(() => {
  const proxyConfig = kintone.plugin.app.getProxyConfig(OPENAI_ENDPOINT_ROOT, 'POST');
  return proxyConfig?.headers.Authorization.replace('Bearer ', '') ?? '';
});

const getCommonPropertyAtom = <T extends keyof Plugin.Common>(property: T) =>
  atom(
    (get) => {
      return get(commonConfigAtom)[property];
    },
    (_, set, newValue: SetStateAction<Plugin.Common[T]>) => {
      set(commonConfigAtom, (common) =>
        produce(common, (draft) => {
          draft[property] = typeof newValue === 'function' ? newValue(draft[property]) : newValue;
        })
      );
    }
  );

export const viewIdAtom = getCommonPropertyAtom('viewId');
export const outputAppIdAtom = getCommonPropertyAtom('outputAppId');
export const outputAppSpaceIdAtom = getCommonPropertyAtom('outputAppSpaceId');
export const outputKeyFieldCodeAtom = getCommonPropertyAtom('outputKeyFieldCode');
export const outputContentFieldCodeAtom = getCommonPropertyAtom('outputContentFieldCode');
export const logAppIdAtom = getCommonPropertyAtom('logAppId');
export const logAppSpaceIdAtom = getCommonPropertyAtom('logAppSpaceId');
export const logKeyFieldCodeAtom = getCommonPropertyAtom('logKeyFieldCode');
export const logContentFieldCodeAtom = getCommonPropertyAtom('logContentFieldCode');
export const enablesAnimationAtom = getCommonPropertyAtom('enablesAnimation');
export const enablesEnterAtom = getCommonPropertyAtom('enablesEnter');
export const enablesShiftEnterAtom = getCommonPropertyAtom('enablesShiftEnter');

export const aiModelAtom = getConditionPropertyAtom('aiModel');
export const assistantNameAtom = getConditionPropertyAtom('name');
export const assistantDescriptionAtom = getConditionPropertyAtom('description');
export const aiIconAtom = getConditionPropertyAtom('aiIcon');
export const assistantExamplesAtom = getConditionPropertyAtom('examples');
export const maxTokensAtom = getConditionPropertyAtom('maxTokens');
export const temperatureAtom = getConditionPropertyAtom('temperature');
export const systemPromptAtom = getConditionPropertyAtom('systemPrompt');
export const allowImageUploadAtom = getConditionPropertyAtom('allowImageUpload');

export const handlePluginConditionDeleteAtom = atom(null, (get, set) => {
  const selectedConditionId = get(selectedConditionIdAtom);
  set(pluginConditionsAtom, (prev) =>
    prev.filter((condition) => condition.id !== selectedConditionId)
  );
  set(selectedConditionIdAtom, null);
  enqueueSnackbar(t('common.config.toast.onConditionDelete'), { variant: 'success' });
});

export const updatePluginConfig = atom(null, async (get, set, actionComponent: ReactNode) => {
  try {
    set(handleLoadingStartAtom);
    const pluginConfig = get(pluginConfigAtom);
    const apiKey = get(apiKeyState);
    const app = get(currentAppIdAtom);
    const { views } = await getViews({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: isDev,
    });

    const newViews = produce(views, (draft) => {
      const viewId = pluginConfig.common.viewId;
      for (const view of Object.values(draft)) {
        if (view.id === viewId && view.type === 'CUSTOM') {
          view.html = `<div id='${VIEW_ROOT_ID}'></div>`;
          view.pager = false;
        }
      }
    });

    await updateViews({
      app,
      views: newViews,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process.env.NODE_ENV === 'development',
    });
    storePluginConfig(pluginConfig, {
      callback: () => {
        kintone.plugin.app.setProxyConfig(
          OPENAI_ENDPOINT_ROOT,
          'POST',
          { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          {},
          () => true
        );
        return true;
      },
      flatProperties: ['conditions'],
      debug: true,
    });
    enqueueSnackbar('設定を更新しました', {
      variant: 'success',
      action: actionComponent,
    });
  } finally {
    set(handleLoadingEndAtom);
  }
});

/**
 * jsonファイルを読み込み、プラグインの設定情報をインポートします
 */
export const importPluginConfigAtom = atom(
  null,
  async (_, set, event: ChangeEvent<HTMLInputElement>) => {
    try {
      set(handleLoadingStartAtom);
      const { files } = event.target;
      invariant(files?.length, 'ファイルが見つかりませんでした');
      const [file] = Array.from(files);
      const fileEvent = await onFileLoad(file!);
      const text = (fileEvent.target?.result ?? '') as string;
      set(pluginConfigAtom, migrateConfig(JSON.parse(text)));
      enqueueSnackbar(t('common.config.toast.import'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('common.config.error.import'), { variant: 'error' });
      throw error;
    } finally {
      set(handleLoadingEndAtom);
    }
  }
);

/**
 * プラグインの設定情報をjsonファイルとしてエクスポートします
 */
export const exportPluginConfigAtom = atom(null, (get, set) => {
  try {
    set(handleLoadingStartAtom);
    const pluginConfig = get(pluginConfigAtom);
    const blob = new Blob([JSON.stringify(pluginConfig, null)], {
      type: 'application/json',
    });
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${PLUGIN_NAME}-config.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    enqueueSnackbar(t('common.config.toast.export'), { variant: 'success' });
  } catch (error) {
    enqueueSnackbar(t('common.config.error.export'), { variant: 'error' });
    throw error;
  } finally {
    set(handleLoadingEndAtom);
  }
});
