import { useRecoilCallback } from 'recoil';
import { fetchChatCompletion } from '@/desktop/original-view/action';
import {
  apiErrorMessageState,
  pluginConfigState,
  selectedAssistantIndexState,
  selectedHistoryState,
  isWaitingForAIState,
  pendingRequestsCountState,
} from '@/desktop/original-view/states/states';
import { useKintoneApp } from './use-kintone-app';
import { useChatHistory } from './use-chat-history';

export const useMessageController = () => {
  const { updateLogApp, updateOutputApp } = useKintoneApp();
  const { pushAssistantMessage } = useChatHistory();

  const fetchChatCompletions = useRecoilCallback(
    ({ reset, set, snapshot }) =>
      async () => {
        try {
          set(isWaitingForAIState, true);
          const config = await snapshot.getPromise(pluginConfigState);
          const assistantIndex = await snapshot.getPromise(selectedAssistantIndexState);
          const chatHistory = await snapshot.getPromise(selectedHistoryState);
          const assistant = config.assistants[assistantIndex];
          if (!chatHistory) {
            throw new Error('チャットが選択されていません');
          }

          const response = await fetchChatCompletion({
            model: assistant.aiModel,
            temperature: assistant.temperature,
            maxTokens: assistant.maxTokens,
            messages: chatHistory.messages,
          });

          const assistantMessage = response.choices[0].message;
          await pushAssistantMessage(assistantMessage.content ?? '');
        } finally {
          reset(isWaitingForAIState);
        }
      },
    []
  );

  const sendMessage = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        try {
          set(pendingRequestsCountState, (count) => count + 1);
          reset(apiErrorMessageState);
          await new Promise((resolve) => setTimeout(resolve, 10));
          await fetchChatCompletions();
          await updateOutputApp();
          await updateLogApp();
        } catch (error: any) {
          const defaultErrorMessage =
            '不明なエラーが発生しました。再度試していただくか、AIモデルを変更してください。';
          if (typeof error === 'string') {
            try {
              const errorObject = JSON.parse(error);

              if (errorObject?.code === 'GAIA_PR03') {
                set(
                  apiErrorMessageState,
                  'タイムアウトしました。再度試していただくか、AIモデルを変更してください。'
                );
              } else {
                set(apiErrorMessageState, errorObject?.message ?? defaultErrorMessage);
              }
            } catch (e) {
              set(apiErrorMessageState, defaultErrorMessage);
            }
          } else if (error instanceof Error) {
            set(apiErrorMessageState, error.message);
          } else {
            set(apiErrorMessageState, error?.message ?? defaultErrorMessage);
          }
        } finally {
          set(pendingRequestsCountState, (count) => count - 1);
        }
      },
    []
  );

  return { sendMessage };
};
