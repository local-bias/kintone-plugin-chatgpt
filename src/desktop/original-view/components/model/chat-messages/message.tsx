import { getHTMLfromMarkdown } from '@/desktop/original-view/action';
import { useChatMessage } from '@/desktop/original-view/contexts/chat-message';
import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { loadingAtom, selectedHistoryAtom } from '@/desktop/original-view/states/states';
import { getTextFromMessageContent } from '@/lib/chatgpt';
import { ChatHistory, ChatMessage } from '@/lib/static';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import OpenAI from 'openai';
import React, { FC, useCallback, useState } from 'react';

type Props = {
  message: ChatMessage['content'];
  cursor?: boolean;
  className?: string;
};

const EditMode: FC<Props> = () => {
  const loading = useAtomValue(loadingAtom);
  const { message, toggleIsEditing } = useChatMessage();
  const [text, setText] = useState(getTextFromMessageContent(message.content));
  const { sendMessage } = useMessageController();
  const { enqueueSnackbar } = useSnackbar();

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const resend = useAtomCallback(
    useCallback(
      async (get, set) => {
        const messageId = message.id;
        const history = get(selectedHistoryAtom);
        const messages = history?.messages ?? [];
        const index = messages.findIndex((m) => m.id === messageId);
        if (!history || index === -1) {
          enqueueSnackbar('メッセージが見つかりませんでした', { variant: 'error' });
          return;
        }

        const newMessages: ChatHistory['messages'] = [
          ...messages.slice(0, index),
          { ...messages[index], content: text },
        ];

        set(selectedHistoryAtom, { ...history, messages: newMessages });
        sendMessage();

        toggleIsEditing();
      },
      [text, toggleIsEditing, message]
    )
  );

  return (
    <div>
      <TextField multiline value={text} onChange={onTextChange} fullWidth />
      <div className='flex justify-end items-center py-2'>
        <Button
          variant='contained'
          color='primary'
          startIcon={<SendIcon />}
          disabled={loading || text === ''}
          onClick={resend}
        >
          送信
        </Button>
      </div>
    </div>
  );
};

const Component: FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  if (typeof message === 'string') {
    const html = getHTMLfromMarkdown(message);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const text =
    (message.find((m) => m.type === 'text') as OpenAI.ChatCompletionContentPartText | undefined)
      ?.text || '';
  const images = message.filter(
    (m) => m.type === 'image_url'
  ) as OpenAI.ChatCompletionContentPartImage[];

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: getHTMLfromMarkdown(text) }}
        className='[&>_*:first-of-type]:mt-0 [&>_*:last-of-type]:mb-0'
      />
      {!!images.length && (
        <div className='flex flex-wrap gap-2 mt-4'>
          {images.map((image, i) => (
            <div key={i} className='w-32 h-32 overflow-hidden'>
              <img src={image.image_url.url ?? ''} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Container: FC<Props> = (props) => {
  const { isEditing } = useChatMessage();

  if (isEditing) {
    return <EditMode {...props} />;
  }
  return <Component {...props} />;
};

export default Container;
