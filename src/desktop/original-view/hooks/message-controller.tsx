import { useRecoilCallback } from 'recoil';
import { fetchChatCompletion } from '@/desktop/original-view/action';
import {
  apiErrorMessageState,
  pluginConfigState,
  selectedAssistantIndexState,
  selectedHistoryState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import { useKintoneApp } from './use-kintone-app';
import { useChatHistory } from './use-chat-history';

export const useMessageController = () => {
  const { updateLogApp, updateOutputApp } = useKintoneApp();
  const { pushAssistantMessage } = useChatHistory();

  const sendMessage = useRecoilCallback(
    ({ set, snapshot, reset }) =>
      async () => {
        try {
          set(waitingForResponseState, true);
          reset(apiErrorMessageState);

          const config = await snapshot.getPromise(pluginConfigState);
          const assistantIndex = await snapshot.getPromise(selectedAssistantIndexState);
          const chatHistory = await snapshot.getPromise(selectedHistoryState);

          if (!chatHistory) {
            throw new Error('チャットが選択されていません');
          }

          process.env.NODE_ENV === 'development' && console.log({ assistantIndex });

          const assistant = config.assistants[assistantIndex];

          const [response] = await Promise.all([
            fetchChatCompletion({
              model: assistant.aiModel,
              temperature: assistant.temperature,
              messages: chatHistory.messages,
            }),
            updateLogApp(),
          ]);

          const assistantMessage = response.choices[0].message;
          await pushAssistantMessage(assistantMessage.content ?? '');
          set(waitingForResponseState, false);
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
          set(waitingForResponseState, false);
        }
      },
    []
  );

  return { sendMessage };
};
