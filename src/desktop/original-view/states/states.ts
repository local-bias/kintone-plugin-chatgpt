import { restorePluginConfig } from '@/lib/plugin';
import { ChatMessage, LatestChatHistory } from '@/lib/static';
import { DefaultValue, atom, selector } from 'recoil';
import { getHTMLfromMarkdown } from '../action';

const PREFIX = 'kintone';

export const pluginConfigState = atom<kintone.plugin.LatestStorage>({
  key: `${PREFIX}pluginConfigState`,
  default: restorePluginConfig(),
});

export const pendingRequestsCountState = atom<number>({
  key: `${PREFIX}pendingRequestsCountState`,
  default: 0,
});

export const isWaitingForAIState = atom<boolean>({
  key: `${PREFIX}isWaitingForAIState`,
  default: false,
});

export const isHistoryFabShownState = selector<boolean>({
  key: `${PREFIX}isHistoryFabShownState`,
  get: ({ get }) => {
    const config = get(pluginConfigState);
    return !!config.outputAppId && !!config.outputKeyFieldCode && !!config.outputContentFieldCode;
  },
});

export const loadingState = selector<boolean>({
  key: `${PREFIX}loadingState`,
  get: ({ get }) => {
    const pendingRequestsCount = get(pendingRequestsCountState);
    const isWaitingForAI = get(isWaitingForAIState);

    return pendingRequestsCount > 0 || isWaitingForAI;
  },
});

export const inputTextState = atom<string>({
  key: `${PREFIX}inputTextState`,
  default: '',
});

export const selectedAssistantIndexState = atom<number>({
  key: `${PREFIX}selectedAssistantIndexState`,
  default: 0,
});

export const selectedAssistantState = selector<kintone.plugin.AiAssistantProps>({
  key: `${PREFIX}selectedAssistantState`,
  get: ({ get }) => {
    const config = get(pluginConfigState);
    const selectedAssistantIndex = get(selectedAssistantIndexState);
    return config.assistants[selectedAssistantIndex];
  },
});

const chatMessagesState = selector<ChatMessage[]>({
  key: `${PREFIX}chatMessagesState`,
  get: ({ get }) => {
    const chatHistory = get(chatHistoriesState);
    const selectedHistoryId = get(selectedHistoryIdState);
    if (!selectedHistoryId) {
      return [];
    }

    const selectedHistory = chatHistory.find((history) => history.id === selectedHistoryId);
    if (!selectedHistory) {
      return [];
    }

    return selectedHistory.messages.map((message) => ({
      ...message,
      content: getHTMLfromMarkdown(message.content ?? ''),
    }));
  },
});

export const displayChatMessagesState = selector<ChatMessage[]>({
  key: `${PREFIX}displayChatMessagesState`,
  get: ({ get }) => {
    const chatMessages = get(chatMessagesState);
    return chatMessages.filter(
      (message) => message.role === 'user' || message.role === 'assistant'
    );
  },
});

export const chatHistoriesState = atom<LatestChatHistory[]>({
  key: `${PREFIX}chatHistoriesState`,
  default: [],
});

export const historiesFetchedState = atom<boolean>({
  key: `${PREFIX}historiesFetchedState`,
  default: false,
});

export const selectedHistoryIdState = atom<string | null>({
  key: `${PREFIX}selectedHistoryIdState`,
  default: null,
});

export const apiErrorMessageState = atom<string>({
  key: `${PREFIX}apiErrorMessageState`,
  default: '',
});

export const selectedHistoryState = selector<LatestChatHistory | null>({
  key: `${PREFIX}selectedHistoryState`,
  get: ({ get }) => {
    const chatHistory = get(chatHistoriesState);
    const selectedHistoryId = get(selectedHistoryIdState);
    if (!selectedHistoryId) {
      return null;
    }
    const selectedHistory = chatHistory.find((history) => history.id === selectedHistoryId);
    return selectedHistory ?? null;
  },
  set: ({ set }, newHistory) => {
    if (!newHistory || newHistory instanceof DefaultValue) {
      return;
    }
    set(chatHistoriesState, (prev) => {
      const index = prev.findIndex((history) => history.id === newHistory.id);
      if (index === -1) {
        return [newHistory, ...prev];
      }
      return prev.map((history, i) => (i === index ? newHistory : history));
    });
  },
});
