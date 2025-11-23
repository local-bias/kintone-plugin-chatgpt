import { fetchChatCompletion } from '@/desktop/original-view/action';
import {
  aiStateAtom,
  apiErrorMessageAtom,
  pendingRequestCountAtom,
  selectedHistoryAtom,
  selectedPluginConditionAtom,
  webSearchEnabledAtom,
} from '@/desktop/original-view/states/states';
import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { authAtom } from '@/desktop/states/auth';
import { atom } from 'jotai';
import { enqueueSnackbar } from 'notistack';
import { handlePushAssistantMessageAtom } from './chat-history';
import { handleUpdateLogAppAtom, handleUpdateOutputAppAtom } from './kintone';

const extractAssistantAnswer = (response: any): string => {
  if (!response) {
    throw new Error('AIレスポンスが空です');
  }

  if ('choices' in response && Array.isArray(response.choices)) {
    const assistantMessage = response.choices[0]?.message;
    const content = assistantMessage?.content;
    if (typeof content === 'string') {
      return content;
    }
    if (Array.isArray(content)) {
      const textPart = content.find((part) => part.type === 'text');
      if (textPart?.text) {
        return textPart.text;
      }
    }
  }

  if ('output_text' in response && response.output_text) {
    if (Array.isArray(response.output_text)) {
      return response.output_text.join('\n');
    }
    if (typeof response.output_text === 'string') {
      return response.output_text;
    }
  }

  if (Array.isArray(response.output)) {
    for (const item of response.output) {
      if (item?.type === 'message' && Array.isArray(item.content)) {
        const textItem = item.content.find(
          (contentPart: any) => contentPart?.type === 'output_text' || contentPart?.type === 'text'
        );
        if (textItem?.text) {
          return textItem.text;
        }
      }
    }
  }

  throw new Error('AIレスポンスから回答を取得できませんでした。');
};

const handleFetchChatCompletionsAtom = atom(null, async (get, set) => {
  try {
    set(apiErrorMessageAtom, null);
    set(aiStateAtom, 'loading');

    const chatHistory = get(selectedHistoryAtom);
    if (!chatHistory) {
      throw new Error('チャットが選択されていません');
    }
    const selectedCondition = get(selectedPluginConditionAtom);
    const webSearchEnabled = get(webSearchEnabledAtom);

    const commonConfig = get(pluginCommonConfigAtom);
    const response: any = await fetchChatCompletion({
      model: selectedCondition.aiModel,
      temperature: selectedCondition.temperature,
      maxTokens: selectedCondition.maxTokens,
      messages: chatHistory.messages,
      systemPrompt: selectedCondition.systemPrompt,
      providerType: commonConfig.providerType,
      verbosity: selectedCondition.verbosity,
      reasoningEffort: selectedCondition.reasoningEffort,
      webSearchEnabled,
      promptId: selectedCondition.promptId,
    });

    const assistantMessage = extractAssistantAnswer(response);
    await set(handlePushAssistantMessageAtom, assistantMessage ?? '');
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
    set(aiStateAtom, 'idle');
  }
});

export const handleSendMessageAtom = atom(null, async (_, set) => {
  try {
    set(pendingRequestCountAtom, (count) => count + 1);
    // ユーザーメッセージのログ保存（V2用）
    await set(handleUpdateLogAppAtom);
    await Promise.allSettled([set(handleFetchChatCompletionsAtom), set(handleUpdateOutputAppAtom)]);
    await set(handleUpdateOutputAppAtom);
    // AIレスポンスのログ保存（V1/V2共通）
    await set(handleUpdateLogAppAtom);
  } finally {
    set(pendingRequestCountAtom, (count) => count - 1);
  }
});
