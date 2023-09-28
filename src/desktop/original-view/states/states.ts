import { OpenAI } from 'openai';
import { atom, selector } from 'recoil';
import { getHTMLfromMarkdown } from '../action';
import { createNewAiAssistant, restorePluginConfig } from '@/lib/plugin';

export type ChatMessage = {
  role: OpenAI.Chat.ChatCompletionMessage['role'];
  content: string;
};

export type ChatHistory = { id: string; title: string; messages: ChatMessage[] };

const PREFIX = 'kintone';

export const pluginConfigState = atom<kintone.plugin.LatestStorage>({
  key: `${PREFIX}pluginConfigState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const inputTextState = atom<string>({
  key: `${PREFIX}inputTextState`,
  default: '',
});

export const waitingForResponseState = atom<boolean>({
  key: `${PREFIX}waitingForResponseState`,
  default: false,
});

export const selectedAssistantIndexState = atom<number>({
  key: `${PREFIX}selectedAssistantIndexState`,
  default: 0,
});

export const chatMessagesState = selector<ChatMessage[]>({
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

export const chatHistoriesState = atom<ChatHistory[]>({
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
