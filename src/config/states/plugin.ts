import { createNewAiAssistant, restorePluginConfig } from '@/lib/plugin';
import { OPENAI_ENDPOINT_ROOT, OPENAI_MODELS } from '@/lib/static';
import { produce } from 'immer';
import { atom, selector } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<kintone.plugin.LatestStorage>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const apiKeyState = atom<string>({
  key: `${PREFIX}apiKeyState`,
  default: (() => {
    const proxyConfig = kintone.plugin.app.getProxyConfig(OPENAI_ENDPOINT_ROOT, 'POST');
    return proxyConfig?.headers.Authorization.replace('Bearer ', '') ?? '';
  })(),
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

export const enablesEnterState = selector<boolean>({
  key: `${PREFIX}enablesEnterState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.enablesEnter ?? false;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.enablesEnter = newValue as boolean;
      })
    );
  },
});

export const enablesShiftEnterState = selector<boolean>({
  key: `${PREFIX}enablesShiftEnterState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.enablesShiftEnter ?? false;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.enablesShiftEnter = newValue as boolean;
      })
    );
  },
});

export const assistantsState = selector<kintone.plugin.AiAssistantProps[]>({
  key: `${PREFIX}assistantsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.assistants ?? [createNewAiAssistant()];
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants = newValue as kintone.plugin.AiAssistantProps[];
      })
    );
  },
});

export const assistantLengthState = selector<number>({
  key: `${PREFIX}assistantLengthState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.assistants.length;
  },
});

export const assistantIndexState = selector<number>({
  key: `${PREFIX}assistantIndexState`,
  get: ({ get }) => {
    const tabIndex = get(tabIndexState);
    return tabIndex === 0 ? 0 : tabIndex - 1;
  },
});

export const assistantNameState = selector<string>({
  key: `${PREFIX}assistantNameState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return storage.assistants[index].name ?? '';
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].name = newValue as string;
      })
    );
  },
});

export const assistantDescriptionState = selector<string>({
  key: `${PREFIX}assistantDescriptionState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return storage.assistants[index].description ?? '';
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].description = newValue as string;
      })
    );
  },
});

export const aiModelState = selector<string>({
  key: `${PREFIX}aiModelState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return storage.assistants[index].aiModel ?? OPENAI_MODELS[0];
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].aiModel = newValue as string;
      })
    );
  },
});

export const aiIconState = selector<string>({
  key: `${PREFIX}aiIconState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return storage.assistants[index].aiIcon ?? '';
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].aiIcon = newValue as string;
      })
    );
  },
});

export const maxTokensState = selector<string>({
  key: `${PREFIX}maxTokensState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return String(storage.assistants[index].maxTokens ?? 0);
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].maxTokens = Number(newValue);
      })
    );
  },
});

export const temperatureState = selector<number>({
  key: `${PREFIX}temperatureState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return storage.assistants[index].temperature ?? 0.7;
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].temperature = newValue as number;
      })
    );
  },
});

export const systemPromptState = selector<string>({
  key: `${PREFIX}systemPromptState`,
  get: ({ get }) => {
    const index = get(assistantIndexState);
    const storage = get(storageState);
    return storage.assistants[index].systemPrompt ?? '';
  },
  set: ({ get, set }, newValue) => {
    const index = get(assistantIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.assistants[index].systemPrompt = newValue as string;
      })
    );
  },
});
