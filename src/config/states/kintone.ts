import { selector } from 'recoil';
import {
  getFormFields,
  kintoneAPI,
  filterFieldProperties,
  getAllApps,
  getViews,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';
import {
  logAppIdState,
  logAppSpaceIdState,
  logContentFieldCodeState,
  logKeyFieldCodeState,
  outputAppIdState,
  outputAppSpaceIdState,
} from './plugin';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import { GUEST_SPACE_ID } from '@/lib/global';

const PREFIX = 'kintone';

export const allKintoneAppsState = selector({
  key: `${PREFIX}allKintoneAppsState`,
  get: async () => {
    const apps = await getAllApps({
      guestSpaceId: GUEST_SPACE_ID,
      debug: process?.env?.NODE_ENV === 'development',
    });
    return apps;
  },
});

export const allAppViewsState = selector<Record<string, kintoneAPI.view.Response>>({
  key: `${PREFIX}allAppViewsState`,
  get: async () => {
    const app = getAppId();
    if (!app) {
      throw new Error('アプリのフィールド情報が取得できませんでした');
    }

    const { views } = await getViews({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process?.env?.NODE_ENV === 'development',
    });
    return views;
  },
});

export const customViewsState = selector({
  key: `${PREFIX}customViewsState`,
  get: async ({ get }) => {
    const allViews = get(allAppViewsState);

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'CUSTOM');

    return filtered.reduce<Record<string, kintoneAPI.view.Response>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});

export const outputAppPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}outputAppPropertiesState`,
  get: async ({ get }) => {
    const appId = get(outputAppIdState);
    if (!appId) {
      return [];
    }
    const appSpaceId = get(outputAppSpaceIdState);

    const { properties } = await withSpaceIdFallback({
      spaceId: appSpaceId,
      func: getFormFields,
      funcParams: {
        app: appId,
        preview: true,
        debug: process.env.NODE_ENV === 'development',
      },
    });

    const filtered = filterFieldProperties(
      properties,
      (field) => !['GROUP', 'SUBTABLE'].includes(field.type)
    );

    return Object.values(filtered).sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const outputAppSingleLineTextPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}outputAppSingleLineTextPropertiesState`,
  get: async ({ get }) => {
    const allProperties = get(outputAppPropertiesState);
    return allProperties
      .filter((field) => field.type === 'SINGLE_LINE_TEXT')
      .filter((singleLineField) => (singleLineField as kintoneAPI.property.SingleLineText).unique);
  },
});

export const outputAppTextPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}outputAppTextPropertiesState`,
  get: async ({ get }) => {
    const allProperties = get(outputAppPropertiesState);
    return allProperties.filter(
      (field) =>
        field.type === 'RICH_TEXT' ||
        field.type === 'MULTI_LINE_TEXT' ||
        field.type === 'SINGLE_LINE_TEXT'
    );
  },
});

export const logAppPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}logAppPropertiesState`,
  get: async ({ get }) => {
    const appId = get(logAppIdState);
    if (!appId) {
      return [];
    }
    const appSpaceId = get(logAppSpaceIdState);

    const { properties } = await withSpaceIdFallback({
      spaceId: appSpaceId,
      func: getFormFields,
      funcParams: {
        app: appId,
        preview: true,
        debug: process.env.NODE_ENV === 'development',
      },
    });

    const filtered = filterFieldProperties(
      properties,
      (field) => !['GROUP', 'SUBTABLE'].includes(field.type)
    );

    return Object.values(filtered).sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const logAppTextPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}logAppTextPropertiesState`,
  get: async ({ get }) => {
    const allProperties = get(logAppPropertiesState);
    return allProperties.filter(
      (field) =>
        field.type === 'RICH_TEXT' ||
        field.type === 'MULTI_LINE_TEXT' ||
        field.type === 'SINGLE_LINE_TEXT'
    );
  },
});

export const logAppTextPropertiesWithoutContentState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}logAppTextPropertiesWithoutContentState`,
  get: async ({ get }) => {
    const allProperties = get(logAppTextPropertiesState);
    const contentFieldCode = get(logContentFieldCodeState);
    return allProperties.filter((field) => field.code !== contentFieldCode);
  },
});

export const logAppTextPropertiesWithoutKeyState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}logAppTextPropertiesWithoutKeyState`,
  get: async ({ get }) => {
    const allProperties = get(logAppTextPropertiesState);
    const keyFieldCode = get(logKeyFieldCodeState);
    return allProperties.filter((field) => field.code !== keyFieldCode);
  },
});
