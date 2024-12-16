import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { getBase64EncodedImage } from '@/lib/image';
import { ChatMessage } from '@/lib/static';
import { deleteAllRecordsByQuery, isGuestSpace, isMobile } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { nanoid } from 'nanoid';
import { useSnackbar } from 'notistack';
import OpenAI from 'openai';
import { useCallback } from 'react';
import { useRecoilCallback } from 'recoil';
import { createNewChatHistory, getChatTitle } from '../action';
import {
  apiErrorMessageAtom,
  chatHistoriesAtom,
  inputFilesAtom,
  inputTextAtom,
  isHistoryDrawerOpenAtom,
  pendingRequestCountAtom,
  selectedHistoryAtom,
  selectedHistoryIdAtom,
  selectedPluginConditionAtom,
} from '../states/states';

export const useChatHistory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const histories = useAtomValue(chatHistoriesAtom);

  const setSelectedHistoryId = useAtomCallback(
    useCallback((get, set, historyId: string) => {
      set(selectedHistoryIdAtom, historyId);
      set(apiErrorMessageAtom, null);
      if (isMobile()) {
        set(isHistoryDrawerOpenAtom, false);
      }
    }, [])
  );

  const pushMessage = useAtomCallback(
    useCallback(async (get, set, message: ChatMessage) => {
      const selectedHistory = get(selectedHistoryAtom);
      const selectedCondition = get(selectedPluginConditionAtom);

      const historyId = selectedHistory?.id ?? nanoid();
      const history =
        selectedHistory ??
        createNewChatHistory({
          id: historyId,
          aiModel: selectedCondition.aiModel,
          temperature: selectedCondition.temperature,
          maxTokens: selectedCondition.maxTokens,
          iconUrl: selectedCondition.aiIcon,
          title: getChatTitle(message),
          messages: [],
        });

      const updatedHistory = produce(history, (draft) => {
        if (draft.messages.length === 0 && selectedCondition.systemPrompt) {
          draft.messages.push({
            id: nanoid(),
            role: 'system',
            content: selectedCondition.systemPrompt,
          });
        }
        draft.messages.push(message);
      });

      set(selectedHistoryIdAtom, historyId);
      set(selectedHistoryAtom, updatedHistory);
    }, [])
  );

  const pushUserMessage = useAtomCallback(
    useCallback(async (get, set) => {
      const content = get(inputTextAtom);
      const files = get(inputFilesAtom);
      if (files) {
        const imageUrlList = await Promise.all(
          files.map(async (file) => getBase64EncodedImage(file))
        );
        const imageContents: OpenAI.ChatCompletionContentPartImage[] = imageUrlList.map((url) => ({
          type: 'image_url',
          image_url: {
            url,
            detail: 'auto',
          },
        }));

        await pushMessage({
          id: nanoid(),
          role: 'user',
          content: [{ type: 'text', text: content.replace(/\n/, '  \n') }, ...imageContents],
        });
      } else {
        await pushMessage({ id: nanoid(), role: 'user', content: content.replace(/\n/, '  \n') });
      }
      set(inputTextAtom, '');
      set(inputFilesAtom, []);
    }, [])
  );

  const pushAssistantMessage = useRecoilCallback(
    () => async (content: string) => {
      await pushMessage({ id: nanoid(), role: 'assistant', content });
    },
    []
  );

  const removeSelectedHistory = useAtomCallback(
    useCallback(async (get, set) => {
      try {
        set(pendingRequestCountAtom, (count) => count + 1);
        const id = get(selectedHistoryIdAtom);
        if (!id) {
          return;
        }
        const common = useAtomValue(pluginCommonConfigAtom);
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
    }, [])
  );

  return {
    histories,
    pushUserMessage,
    pushAssistantMessage,
    setSelectedHistoryId,
    removeSelectedHistory,
  };
};
