import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  apiErrorMessageState,
  chatHistoriesState,
  inputFilesState,
  inputTextState,
  pendingRequestsCountState,
  pluginConfigState,
  selectedAssistantIndexState,
  selectedHistoryIdState,
  selectedHistoryState,
} from '../states/states';
import { deleteAllRecordsByQuery, isGuestSpace } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { useSnackbar } from 'notistack';
import { createNewChatHistory, getChatTitle } from '../action';
import { nanoid } from 'nanoid';
import { ChatMessage } from '@/lib/static';
import OpenAI from 'openai';
import { getBase64EncodedImage } from '@/lib/image';

export const useChatHistory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const histories = useRecoilValue(chatHistoriesState);

  const setSelectedHistoryId = useRecoilCallback(
    ({ reset, set }) =>
      (historyId: string) => {
        set(selectedHistoryIdState, historyId);
        reset(apiErrorMessageState);
      },
    []
  );

  const pushMessage = useRecoilCallback(
    ({ set, snapshot }) =>
      async (message: ChatMessage) => {
        const selectedHistory = await snapshot.getPromise(selectedHistoryState);
        const config = await snapshot.getPromise(pluginConfigState);
        const assistantIndex = await snapshot.getPromise(selectedAssistantIndexState);
        const assistant = config.conditions[assistantIndex];

        const historyId = selectedHistory?.id ?? nanoid();
        const history =
          selectedHistory ??
          createNewChatHistory({
            id: historyId,
            aiModel: assistant.aiModel,
            temperature: assistant.temperature,
            maxTokens: assistant.maxTokens,
            iconUrl: assistant.aiIcon,
            title: getChatTitle(message),
            messages: [],
          });

        const updatedHistory = produce(history, (draft) => {
          if (draft.messages.length === 0 && assistant.systemPrompt) {
            draft.messages.push({ id: nanoid(), role: 'system', content: assistant.systemPrompt });
          }
          draft.messages.push(message);
        });

        set(selectedHistoryIdState, historyId);
        set(selectedHistoryState, updatedHistory);
      },
    []
  );

  const pushUserMessage = useRecoilCallback(
    ({ reset, snapshot }) =>
      async () => {
        const content = await snapshot.getPromise(inputTextState);
        const files = await snapshot.getPromise(inputFilesState);
        if (files) {
          const imageUrlList = await Promise.all(
            files.map(async (file) => getBase64EncodedImage(file))
          );
          const imageContents: OpenAI.ChatCompletionContentPartImage[] = imageUrlList.map(
            (url) => ({
              type: 'image_url',
              image_url: {
                url,
                detail: 'auto',
              },
            })
          );

          await pushMessage({
            id: nanoid(),
            role: 'user',
            content: [{ type: 'text', text: content.replace(/\n/, '  \n') }, ...imageContents],
          });
        } else {
          await pushMessage({ id: nanoid(), role: 'user', content: content.replace(/\n/, '  \n') });
        }
        reset(inputTextState);
        reset(inputFilesState);
      },
    []
  );

  const pushAssistantMessage = useRecoilCallback(
    () => async (content: string) => {
      await pushMessage({ id: nanoid(), role: 'assistant', content });
    },
    []
  );

  const removeSelectedHistory = useRecoilCallback(
    ({ reset, set, snapshot }) =>
      async () => {
        try {
          set(pendingRequestsCountState, (count) => count + 1);
          const id = (await snapshot.getPromise(selectedHistoryIdState))!;
          const { common } = await snapshot.getPromise(pluginConfigState);
          const { outputAppId, outputKeyFieldCode, outputAppSpaceId } = common;

          const isGuest = await isGuestSpace(outputAppId);

          const query = `${outputKeyFieldCode} = "${id}"`;

          await deleteAllRecordsByQuery({
            app: outputAppId,
            query,
            debug: process.env.NODE_ENV === 'development',
            guestSpaceId: isGuest ? outputAppSpaceId : undefined,
          });

          set(chatHistoriesState, (_histories) =>
            produce(_histories, (draft) => {
              const index = draft.findIndex((history) => history.id === id);
              draft.splice(index, 1);
            })
          );

          reset(selectedHistoryIdState);
          enqueueSnackbar('履歴を削除しました', { variant: 'success' });
        } finally {
          set(pendingRequestsCountState, (count) => count - 1);
        }
      },
    []
  );

  return {
    histories,
    pushUserMessage,
    pushAssistantMessage,
    setSelectedHistoryId,
    removeSelectedHistory,
  };
};
