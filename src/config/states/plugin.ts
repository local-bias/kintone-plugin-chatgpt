import { restorePluginConfig } from '@/lib/plugin';
import { OPENAI_ENDPOINT_ROOT, OPENAI_MODELS } from '@/lib/static';
import { produce } from 'immer';
import { atom, selector } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<kintone.plugin.Storage>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const apiKeyState = atom<string>({
  key: `${PREFIX}apiKeyState`,
  default: (() => {
    const proxyConfig = kintone.plugin.app.getProxyConfig(OPENAI_ENDPOINT_ROOT, 'POST');
    return proxyConfig?.headers.Authorization.replace('Bearer ', '') ?? '';
  })(),
});

export const aiModelState = selector<string>({
  key: `${PREFIX}aiModelState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.aiModel ?? OPENAI_MODELS[0];
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.aiModel = newValue as string;
      })
    );
  },
});

export const viewIdState = selector<string>({
  key: `${PREFIX}viewIdState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.viewId ?? '';
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
    return storage.outputAppId ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.outputAppId = newValue as string;
      })
    );
  },
});

export const outputAppSpaceIdState = selector<string | undefined>({
  key: `${PREFIX}outputAppSpaceIdState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.outputAppSpaceId;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.outputAppSpaceId = newValue as string | undefined;
      })
    );
  },
});

export const outputKeyFieldCodeState = selector<string>({
  key: `${PREFIX}outputKeyFieldCodeState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.outputKeyFieldCode ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.outputKeyFieldCode = newValue as string;
      })
    );
  },
});

export const outputContentFieldCodeState = selector<string>({
  key: `${PREFIX}outputContentFieldCodeState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.outputContentFieldCode ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.outputContentFieldCode = newValue as string;
      })
    );
  },
});

export const logAppIdState = selector<string>({
  key: `${PREFIX}logAppIdState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.logAppId ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.logAppId = newValue as string;
      })
    );
  },
});

export const logAppSpaceIdState = selector<string | undefined>({
  key: `${PREFIX}logAppSpaceIdState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.logAppSpaceId;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.logAppSpaceId = newValue as string | undefined;
      })
    );
  },
});

export const logKeyFieldCodeState = selector<string>({
  key: `${PREFIX}logKeyFieldCodeState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.logKeyFieldCode ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft!.logKeyFieldCode = newValue as string;
      })
    );
  },
});

export const logContentFieldCodeState = selector<string>({
  key: `${PREFIX}logContentFieldCodeState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.logContentFieldCode ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.logContentFieldCode = newValue as string;
      })
    );
  },
});

export const enablesAnimationState = selector<boolean>({
  key: `${PREFIX}enablesAnimationState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.enablesAnimation ?? false;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.enablesAnimation = newValue as boolean;
      })
    );
  },
});

export const aiIconState = selector<string>({
  key: `${PREFIX}aiIconState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.aiIcon ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.aiIcon = newValue as string;
      })
    );
  },
});

export const systemPromptState = selector<string>({
  key: `${PREFIX}systemPromptState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.systemPrompt ?? '';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.systemPrompt = newValue as string;
      })
    );
  },
});
