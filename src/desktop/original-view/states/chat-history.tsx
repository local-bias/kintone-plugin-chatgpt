import { getBase64EncodedImage } from '@/lib/image';
import { ChatImageContentPart, ChatMessage } from '@/lib/static';
import { produce } from 'immer';
import { atom } from 'jotai';
import { nanoid } from 'nanoid';
import { createNewChatHistory, getChatTitle } from '../action';
import {
  inputFilesAtom,
  inputTextAtom,
  selectedHistoryAtom,
  selectedHistoryIdAtom,
  selectedPluginConditionAtom,
} from './states';

const handlePushMessageAtom = atom(null, async (get, set, message: ChatMessage) => {
  const selectedHistory = get(selectedHistoryAtom);
  const selectedCondition = get(selectedPluginConditionAtom);

  const historyId = selectedHistory?.id ?? nanoid();
  const history =
    selectedHistory ??
    createNewChatHistory({
      id: historyId,
      assistantId: selectedCondition.id,
      title: getChatTitle(message),
      messages: [],
    });

  const updatedHistory = produce(history, (draft) => {
    draft.messages.push(message);
  });

  set(selectedHistoryIdAtom, historyId);
  set(selectedHistoryAtom, updatedHistory);
});

export const handlePushUserMessageAtom = atom(null, async (get, set) => {
  const content = get(inputTextAtom);
  const files = get(inputFilesAtom);
  if (files) {
    const imageUrlList = await Promise.all(files.map(async (file) => getBase64EncodedImage(file)));
    const imageContents: ChatImageContentPart[] = imageUrlList.map((url) => ({
      type: 'image_url',
      image_url: {
        url,
      },
    }));

    await set(handlePushMessageAtom, {
      id: nanoid(),
      role: 'user',
      content: [{ type: 'text', text: content.replace(/\n/, '  \n') }, ...imageContents],
    });
  } else {
    await set(handlePushMessageAtom, {
      id: nanoid(),
      role: 'user',
      content: content.replace(/\n/, '  \n'),
    });
  }
  set(inputTextAtom, '');
  set(inputFilesAtom, []);
});

export const handlePushAssistantMessageAtom = atom(null, async (_, set, content: string) => {
  await set(handlePushMessageAtom, { id: nanoid(), role: 'assistant', content });
});
