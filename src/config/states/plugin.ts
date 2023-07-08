import { PLUGIN_ID } from '@/lib/global';
import { createConfig } from '@/lib/plugin';
import { restoreStorage } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { atom, selector } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<kintone.plugin.Storage>({
  key: `${PREFIX}storageState`,
  default: restoreStorage<kintone.plugin.Storage>(PLUGIN_ID) ?? createConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const apiKeyState = atom<string>({
  key: `${PREFIX}apiKeyState`,
  default: '',
});

export const viewIdState = selector<string>({
  key: `${PREFIX}viewIdState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.viewId ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.viewId = newValue as string;
      })
    );
  },
});

export const outputAppIdState = selector<string>({
  key: `${PREFIX}outputAppIdState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.outputAppId ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.outputAppId = newValue as string;
      })
    );
  },
});

export const outputContentFieldCodeState = selector<string>({
  key: `${PREFIX}outputContentFieldCodeState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.outputContentFieldCode ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.outputContentFieldCode = newValue as string;
      })
    );
  },
});
