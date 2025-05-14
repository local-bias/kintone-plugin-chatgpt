import { pluginCommonConfigAtom, pluginConditionsAtom } from '@/desktop/public-state';
import { ChatHistory, ChatMessage, URL_QUERY_CHAT_ID } from '@/lib/static';
import { PluginCondition } from '@/schema/plugin-config';
import { deleteAllRecordsByQuery, isGuestSpace, isMobile } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { atomWithReset, RESET } from 'jotai/utils';
import { enqueueSnackbar } from 'notistack';

export const pendingRequestCountAtom = atom(0);

export const isWaitingForAIAtom = atom(false);

export const loadingAtom = atom(
  (get) => get(pendingRequestCountAtom) > 0 || get(isWaitingForAIAtom)
);

export const isHistoryFabShownAtom = atom((get) => {
  const common = get(pluginCommonConfigAtom);
  return !!common.outputAppId && !!common.outputKeyFieldCode && !!common.outputContentFieldCode;
});

export const isHistoryDrawerOpenAtom = atom(false);

export const inputTextAtom = atom<string>('');
export const inputFilesAtom = atom<File[]>([]);

export const selectedPluginConditionIdAtom = atom<string | null>(null);
export const selectedPluginConditionAtom = atom<PluginCondition>((get) => {
  const conditions = get(pluginConditionsAtom);
  const conditionId = get(selectedPluginConditionIdAtom);
  return conditions.find((condition) => condition.id === conditionId) ?? conditions[0];
});

export const chatHistoriesAtom = atom<ChatHistory[]>([]);

const chatMessagesAtom = atom<ChatMessage[]>((get) => {
  const chatHistory = get(chatHistoriesAtom);
  const selectedHistoryId = get(selectedHistoryIdAtom);
  if (!selectedHistoryId) {
    return [];
  }

  const selectedHistory = chatHistory.find((history) => history.id === selectedHistoryId);
  if (!selectedHistory) {
    return [];
  }

  return selectedHistory.messages;
});
export const displayingChatMessagesAtom = atom<ChatMessage[]>((get) => {
  const chatMessages = get(chatMessagesAtom);
  return chatMessages.filter((message) => message.role === 'user' || message.role === 'assistant');
});

const chatHistoriesPaginationChunkSizeAtom = atom(30);
export const chatHistoriesPaginationMaxAtom = atom((get) => {
  const chatHistories = get(chatHistoriesAtom);
  const chunkSize = get(chatHistoriesPaginationChunkSizeAtom);
  return Math.ceil(chatHistories.length / chunkSize);
});

export const chatHistoriesPaginationIndexAtom = atom(1);

export const displayChatHistoriesAtom = atom<ChatHistory[]>((get) => {
  const chatHistories = get(chatHistoriesAtom);
  const paginationIndex = get(chatHistoriesPaginationIndexAtom);
  const chunkSize = get(chatHistoriesPaginationChunkSizeAtom);

  return chatHistories.slice((paginationIndex - 1) * chunkSize, paginationIndex * chunkSize);
});

export const historiesFetchedAtom = atom(false);

export const selectedHistoryIdAtom = atom<string | null>(null);
export const urlSearchParamsEffect = atomEffect((get) => {
  const selectedHistoryId = get(selectedHistoryIdAtom);
  console.log(`✨ selected history id changed: ${selectedHistoryId}`);
  const url = new URL(location.href);
  if (!selectedHistoryId) {
    url.searchParams.delete(URL_QUERY_CHAT_ID);
  }
  if (selectedHistoryId) {
    url.searchParams.set(URL_QUERY_CHAT_ID, selectedHistoryId);
  }
  history.replaceState(null, '', url.toString());
});

export const apiErrorMessageAtom = atomWithReset<string | null>(null);

export const handleHistoryIdSelectAtom = atom(null, (_, set, historyId: string) => {
  set(selectedHistoryIdAtom, historyId);
  set(apiErrorMessageAtom, RESET);
  if (isMobile()) {
    set(isHistoryDrawerOpenAtom, false);
  }
});

export const handleChatHistoryDeleteAtom = atom(null, async (get, set) => {
  try {
    set(pendingRequestCountAtom, (count) => count + 1);
    const id = get(selectedHistoryIdAtom);
    if (!id) {
      return;
    }
    const common = get(pluginCommonConfigAtom);
    const { outputAppId, outputKeyFieldCode, outputAppSpaceId } = common;

    const isGuest = await isGuestSpace(outputAppId);

    const query = `${outputKeyFieldCode} = "${id}"`;

    await deleteAllRecordsByQuery({
      app: outputAppId,
      query,
      debug: process.env.NODE_ENV === 'development',
      guestSpaceId: isGuest ? outputAppSpaceId : undefined,
    });

    set(chatHistoriesAtom, (_histories) =>
      produce(_histories, (draft) => {
        const index = draft.findIndex((history) => history.id === id);
        draft.splice(index, 1);
      })
    );

    set(selectedHistoryIdAtom, null);
    enqueueSnackbar('履歴を削除しました', { variant: 'success' });
  } finally {
    set(pendingRequestCountAtom, (count) => count - 1);
  }
});

export const selectedHistoryAtom = atom<ChatHistory | null, ChatHistory[], void>(
  (get) => {
    const chatHistory = get(chatHistoriesAtom);
    const selectedHistoryId = get(selectedHistoryIdAtom);
    if (!selectedHistoryId) {
      return null;
    }
    const selectedHistory = chatHistory.find((history) => history.id === selectedHistoryId);
    return selectedHistory ?? null;
  },
  (get, set, newValue) => {
    if (!newValue) {
      return;
    }
    set(chatHistoriesAtom, (prev) => {
      const index = prev.findIndex((history) => history.id === newValue.id);
      if (index === -1) {
        return [newValue, ...prev];
      }
      return prev.map((history, i) => (i === index ? newValue : history));
    });
  }
);
