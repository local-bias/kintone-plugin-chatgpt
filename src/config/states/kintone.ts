import { selector } from 'recoil';
import {
  getFormFields,
  kintoneAPI,
  filterFieldProperties,
  getAllApps,
  getViews,
} from '@konomi-app/kintone-utilities';
import { outputAppIdState } from './plugin';
import { getAppId } from '@lb-ribbit/kintone-xapp';

const PREFIX = 'kintone';

export const allKintoneAppsState = selector({
  key: `${PREFIX}allKintoneAppsState`,
  get: async ({ get }) => {
    const guestSpaceId = get(guestSpaceIdState);
    const apps = await getAllApps({
      guestSpaceId: guestSpaceId ?? undefined,
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

    const guestSpaceId = get(guestSpaceIdState);
    const { properties } = await await getFormFields({
      app: appId,
      preview: true,
      guestSpaceId: guestSpaceId ?? undefined,
      debug: process.env.NODE_ENV === 'development',
    });
    const filtered = filterFieldProperties(
      properties,
      (field) => !['GROUP', 'SUBTABLE'].includes(field.type)
    );

    return Object.values(filtered).sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const outputAppUserSelectPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}outputAppUserSelectPropertiesState`,
  get: async ({ get }) => {
    const allProperties = get(outputAppPropertiesState);
    return allProperties.filter((field) => field.type === 'USER_SELECT');
  },
});

export const outputAppTextPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}outputAppRichTextPropertiesState`,
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

export const guestSpaceIdState = selector<string | null>({
  key: `${PREFIX}guestSpaceIdState`,
  get: () => {
    const matchArray = location.pathname.match(/^\/k\/guest\/(\d+)/);
    const guestSpaceId = matchArray ? matchArray[1] : null;
    return guestSpaceId;
  },
});
