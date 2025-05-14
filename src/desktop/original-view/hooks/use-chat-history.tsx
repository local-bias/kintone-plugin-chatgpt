import { getBase64EncodedImage } from '@/lib/image';
import { ChatMessage } from '@/lib/static';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { nanoid } from 'nanoid';
import OpenAI from 'openai';
import { useCallback } from 'react';
import { createNewChatHistory, getChatTitle } from '../action';
import {
  chatHistoriesAtom,
  inputFilesAtom,
  inputTextAtom,
  selectedHistoryAtom,
  selectedHistoryIdAtom,
  selectedPluginConditionAtom,
} from '../states/states';

export const useChatHistory = () => {
  const histories = useAtomValue(chatHistoriesAtom);

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

  const pushAssistantMessage = useAtomCallback(
    useCallback(async (_, __, content: string) => {
      await pushMessage({ id: nanoid(), role: 'assistant', content });
    }, [])
  );

  return {
    histories,
    pushUserMessage,
    pushAssistantMessage,
  };
};
