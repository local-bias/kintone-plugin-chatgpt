import { useRecoilCallback } from 'recoil';
import {
  createNewChatHistory,
  fetchChatCompletion,
  logChatCompletion,
} from '@/desktop/original-view/action';
import {
  apiErrorMessageState,
  chatHistoriesState,
  inputTextState,
  pluginConfigState,
  selectedAssistantIndexState,
  selectedHistoryIdState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { addRecord, updateRecord, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { LatestChatHistory } from '@/lib/static';

export const useMessageController = () => {
  const sendMessage = useRecoilCallback(
    ({ set, snapshot, reset }) =>
      async () => {
        try {
          set(waitingForResponseState, true);
          const config = await snapshot.getPromise(pluginConfigState);
          const assistantIndex = await snapshot.getPromise(selectedAssistantIndexState);

          process.env.NODE_ENV === 'development' && console.log({ assistantIndex });

          const assistant = config.assistants[assistantIndex];

          const {
            outputAppId,
            outputAppSpaceId,
            outputKeyFieldCode,
            outputContentFieldCode,
            logAppId,
            logAppSpaceId,
            logKeyFieldCode,
            logContentFieldCode,
          } = config;
          const input = await snapshot.getPromise(inputTextState);
          if (input === '') {
            return;
          }
          reset(inputTextState);
          reset(apiErrorMessageState);

          const temporaryId = nanoid();
          const selectedHistoryId = await snapshot.getPromise(selectedHistoryIdState);
          const histories = await snapshot.getPromise(chatHistoriesState);
          const chatHisory =
            histories.find((history) => history.id === selectedHistoryId) ??
            createNewChatHistory({
              id: temporaryId,
              iconUrl: assistant.aiIcon,
              title: input.slice(0, 8),
            });

          const updatedChatHistory = produce(chatHisory, (draft) => {
            if (!draft.messages.length && assistant.systemPrompt) {
              draft.messages.push({ role: 'system', content: assistant.systemPrompt });
            }
            draft.messages.push({ role: 'user', content: input });
          });
          let historyId = selectedHistoryId;
          if (!selectedHistoryId) {
            historyId = temporaryId;
            if (outputAppId && outputKeyFieldCode && outputContentFieldCode) {
              await withSpaceIdFallback({
                spaceId: outputAppSpaceId,
                func: addRecord,
                funcParams: {
                  app: outputAppId,
                  record: {
                    [outputKeyFieldCode]: { value: historyId },
                    [outputContentFieldCode]: { value: JSON.stringify(updatedChatHistory) },
                  },
                },
              });
            }
            set(selectedHistoryIdState, historyId);
          }
          const historyWithId: LatestChatHistory = { ...updatedChatHistory, id: historyId! };
          set(chatHistoriesState, (histories) =>
            produce(histories, (draft) => {
              const index = draft.findIndex((history) => history.id === historyId);
              if (index !== -1) {
                draft[index] = historyWithId;
              } else {
                draft.unshift(historyWithId);
              }
            })
          );
          const response = await fetchChatCompletion({
            model: assistant.aiModel,
            temperature: assistant.temperature,
            messages: historyWithId.messages,
          });

          const assistantMessage = response.choices[0].message;
          if (assistantMessage) {
            const historyWithAssistantMessage = produce(historyWithId, (draft) => {
              draft.messages.push({ role: 'assistant', content: assistantMessage.content ?? '' });
            });
            if (outputAppId && outputContentFieldCode) {
              await withSpaceIdFallback({
                spaceId: outputAppSpaceId,
                func: updateRecord,
                funcParams: {
                  app: outputAppId,
                  updateKey: {
                    field: outputKeyFieldCode,
                    value: historyId!,
                  },
                  record: {
                    [outputContentFieldCode]: {
                      value: JSON.stringify(historyWithAssistantMessage),
                    },
                  },
                  debug: process.env.NODE_ENV === 'development',
                },
              });
            }
            set(chatHistoriesState, (histories) =>
              produce(histories, (draft) => {
                const index = draft.findIndex((history) => history.id === historyId);
                if (index !== -1) {
                  draft[index] = historyWithAssistantMessage;
                }
              })
            );
            set(waitingForResponseState, false);
            if (logAppId && logContentFieldCode && logKeyFieldCode) {
              await logChatCompletion({
                appId: logAppId,
                spaceId: logAppSpaceId,
                keyFieldCode: logKeyFieldCode,
                contentFieldCode: logContentFieldCode,
                chatHistory: historyWithAssistantMessage,
              });
            }
          }
        } catch (error: any) {
          if (error instanceof Error) {
            set(apiErrorMessageState, error.message);
            console.error(error.message);
          } else {
            set(apiErrorMessageState, '不明なエラーが発生しました');
          }
        } finally {
          set(waitingForResponseState, false);
        }
      },
    []
  );

  return { sendMessage };
};