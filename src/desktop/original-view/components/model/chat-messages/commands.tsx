import {
  useChatMessage,
  useRegenerateChatMessage,
} from '@/desktop/original-view/contexts/chat-message';
import { Tooltip } from '@mui/material';
import { Check, Clipboard, Pencil, X, RotateCw } from 'lucide-react';
import OpenAI from 'openai';
import React, { forwardRef, HTMLAttributes, useEffect, type FC } from 'react';

const IconWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div
    {...props}
    ref={ref}
    className='bg-white/70 opacity-0 pointer-events-none group-hover/message:opacity-100 group-hover/message:pointer-events-auto cursor-pointer transition-all grid place-items-center sticky top-16 z-10 w-8 h-8 rounded shadow hover:shadow-md text-gray-400 hover:text-blue-500'
  />
));

const Copy: FC = () => {
  const { message } = useChatMessage();
  const [copied, setCopied] = React.useState(false);

  const onCopyButtonClick = () => {
    const text = message.content;
    if (!text) {
      return;
    }
    if (typeof text !== 'string') {
      const foundText = text.find((m) => m.type === 'text') as
        | OpenAI.ChatCompletionContentPartText
        | undefined;
      if (!foundText) {
        return;
      }
      navigator.clipboard.writeText(foundText.text);
    } else {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <>
      <Tooltip title={copied ? 'コピーしました！' : 'クリップボードにコピー'}>
        <IconWrapper onClick={onCopyButtonClick}>
          {copied ? <Check className='w-4 h-4' /> : <Clipboard className='w-4 h-4' />}
        </IconWrapper>
      </Tooltip>
    </>
  );
};

const Edit: FC = () => {
  const { message, isEditing, toggleIsEditing } = useChatMessage();

  if (message.role !== 'user') {
    return null;
  }

  return (
    <>
      <Tooltip title={isEditing ? '編集を中断する' : 'このメッセージからやり直す'}>
        <IconWrapper onClick={toggleIsEditing}>
          {isEditing ? <X className='w-4 h-4' /> : <Pencil className='w-4 h-4' />}
        </IconWrapper>
      </Tooltip>
    </>
  );
};

const Regenerate: FC = () => {
  const { message } = useChatMessage();
  const { regenerate } = useRegenerateChatMessage();

  if (message.role !== 'assistant') {
    return null;
  }

  return (
    <>
      <Tooltip title='このメッセージを再生成'>
        <IconWrapper onClick={regenerate}>
          <RotateCw className='w-4 h-4' />
        </IconWrapper>
      </Tooltip>
    </>
  );
};

const Component: FC = () => (
  <div className='p-4'>
    <div className='hidden lg:flex gap-2'>
      <Edit />
      <Regenerate />
      <Copy />
    </div>
  </div>
);

export default Component;
