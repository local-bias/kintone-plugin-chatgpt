import { fetchChatCompletion } from '@/desktop/original-view/action';
import {
  apiErrorMessageAtom,
  isWaitingForAIAtom,
  pendingRequestCountAtom,
  selectedHistoryAtom,
} from '@/desktop/original-view/states/states';
import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useChatHistory } from './use-chat-history';
import { useKintoneApp } from './use-kintone-app';

export const useMessageController = () => {
  const { updateLogApp, updateOutputApp } = useKintoneApp();
  const { pushAssistantMessage } = useChatHistory();

  const fetchChatCompletions = useAtomCallback(
    useCallback(async (get, set) => {
      try {
        set(apiErrorMessageAtom, null);
        set(isWaitingForAIAtom, true);

        const chatHistory = get(selectedHistoryAtom);
        if (!chatHistory) {
          throw new Error('チャットが選択されていません');
        }

        const commonConfig = get(pluginCommonConfigAtom);
        const response = await fetchChatCompletion({
          model: chatHistory.aiModel,
          temperature: chatHistory.temperature,
          maxTokens: chatHistory.maxTokens,
          messages: chatHistory.messages,
          providerType: commonConfig.providerType,
        });

        const assistantMessage = response.choices[0].message;
        await pushAssistantMessage(assistantMessage.content ?? '');
      } catch (error: any) {
        const defaultErrorMessage =
          '不明なエラーが発生しました。再度試していただくか、AIモデルを変更してください。';
        if (typeof error === 'string') {
          try {
            const errorObject = JSON.parse(error);

            if (errorObject?.code === 'GAIA_PR03') {
              set(
                apiErrorMessageAtom,
                'タイムアウトしました。再度試していただくか、AIモデルを変更してください。'
              );
            } else {
              set(apiErrorMessageAtom, errorObject?.message ?? defaultErrorMessage);
            }
          } catch (e) {
            set(apiErrorMessageAtom, defaultErrorMessage);
          }
        } else if (error instanceof Error) {
          set(apiErrorMessageAtom, error.message);
        } else {
          set(apiErrorMessageAtom, error?.message ?? defaultErrorMessage);
        }
      } finally {
        set(isWaitingForAIAtom, false);
      }
    }, [])
  );

  const sendMessage = useAtomCallback(
    useCallback(async (get, set) => {
      try {
        set(pendingRequestCountAtom, (count) => count + 1);
        await new Promise((resolve) => setTimeout(resolve, 10));
        await Promise.allSettled([fetchChatCompletions(), updateOutputApp()]);
        await updateOutputApp();
        await updateLogApp();
      } finally {
        set(pendingRequestCountAtom, (count) => count - 1);
      }
    }, [])
  );

  return { sendMessage };
};
