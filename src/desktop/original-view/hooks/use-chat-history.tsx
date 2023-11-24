import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  apiErrorMessageState,
  chatHistoriesState,
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
import { createNewChatHistory } from '../action';
import { nanoid } from 'nanoid';
import { ChatMessage } from '@/lib/static';

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
        const assistant = config.assistants[assistantIndex];

        const historyId = selectedHistory?.id ?? nanoid();
        const history =
          selectedHistory ??
          createNewChatHistory({
            id: historyId,
            aiModel: assistant.aiModel,
            temperature: assistant.temperature,
            maxTokens: assistant.maxTokens,
            iconUrl: assistant.aiIcon,
            title: message.content.slice(0, 16),
            messages: [],
          });

        const updatedHistory = produce(history, (draft) => {
          if (draft.messages.length === 0 && assistant.systemPrompt) {
            draft.messages.push({ role: 'system', content: assistant.systemPrompt });
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
        await pushMessage({ role: 'user', content: content.replace(/\n/, '  \n') });
        reset(inputTextState);
      },
    []
  );

  const pushAssistantMessage = useRecoilCallback(
    () => async (content: string) => {
      await pushMessage({ role: 'assistant', content });
    },
    []
  );

  const removeSelectedHistory = useRecoilCallback(
    ({ reset, set, snapshot }) =>
      async () => {
        try {
          set(pendingRequestsCountState, (count) => count + 1);
          const id = (await snapshot.getPromise(selectedHistoryIdState))!;
          const { outputAppId, outputKeyFieldCode, outputAppSpaceId } = await snapshot.getPromise(
            pluginConfigState
          );

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
