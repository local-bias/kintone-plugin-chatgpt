import { getHTMLfromMarkdown } from '@/desktop/original-view/action';
import { useChatMessage } from '@/desktop/original-view/contexts/chat-message';
import { handleSendMessageAtom } from '@/desktop/original-view/states/chat-message';
import { loadingAtom, selectedHistoryAtom } from '@/desktop/original-view/states/states';
import { getTextFromMessageContent } from '@/lib/chatgpt';
import { ChatHistory, ChatImageContentPart, ChatMessage, ChatTextContentPart } from '@/lib/static';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { buildCollapsedPreview } from './utils';

type Props = {
  message: ChatMessage['content'];
  cursor?: boolean;
  className?: string;
};

function EditMode() {
  const loading = useAtomValue(loadingAtom);
  const { message, toggleIsEditing } = useChatMessage();
  const [text, setText] = useState(getTextFromMessageContent(message.content));
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
        set(handleSendMessageAtom);

        toggleIsEditing();
      },
      [text, toggleIsEditing, message]
    )
  );

  return (
    <div>
      <TextField multiline value={text} onChange={onTextChange} fullWidth />
      <div className='rad:flex rad:justify-end rad:items-center rad:py-2!'>
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
}

function ChatMessageComponent({ message }: Props) {
  const { isCollapsed, isCollapsible } = useChatMessage();
  const shouldShowCollapsed = isCollapsible && isCollapsed;

  if (!message) {
    return null;
  }

  if (typeof message === 'string') {
    const html = getHTMLfromMarkdown(
      shouldShowCollapsed ? buildCollapsedPreview(message) : message
    );
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const text =
    (message.find((m) => m.type === 'text') as ChatTextContentPart | undefined)?.text || '';
  const images = message.filter((m) => m.type === 'image_url') as ChatImageContentPart[];
  const displayText = shouldShowCollapsed ? buildCollapsedPreview(text) : text;

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: getHTMLfromMarkdown(displayText) }}
        className='rad:[&>_*:first-of-type]:mt-0 rad:[&>_*:last-of-type]:mb-0'
      />
      {!shouldShowCollapsed && !!images.length && (
        <div className='rad:flex rad:flex-wrap rad:gap-2 rad:mt-4!'>
          {images.map((image, i) => (
            <div key={i} className='rad:w-32 rad:h-32 rad:overflow-hidden'>
              <img
                src={image.image_url.url ?? ''}
                className='rad:w-full rad:h-full rad:object-cover'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChatMessage(props: Props) {
  const { isEditing } = useChatMessage();

  if (isEditing) {
    return <EditMode />;
  }
  return <ChatMessageComponent {...props} />;
}
