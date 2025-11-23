import {
  useChatMessage,
  useRegenerateChatMessage,
} from '@/desktop/original-view/contexts/chat-message';
import { ChatTextContentPart } from '@/lib/static';
import { Tooltip } from '@mui/material';
import { Check, ChevronDown, ChevronUp, Clipboard, Pencil, RotateCw, X } from 'lucide-react';
import React, { forwardRef, HTMLAttributes, useEffect, type FC } from 'react';

const IconWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div
    {...props}
    ref={ref}
    className='rad:bg-white/70 rad:opacity-0 rad:pointer-events-none rad:group-hover/message:opacity-100 rad:group-hover/message:pointer-events-auto rad:cursor-pointer rad:transition-all rad:grid rad:place-items-center rad:sticky rad:top-16 rad:z-10 rad:w-8 rad:h-8 rad:rounded rad:shadow rad:hover:shadow-md rad:text-gray-400 rad:hover:text-blue-500'
  />
));

function Copy() {
  const { message } = useChatMessage();
  const [copied, setCopied] = React.useState(false);

  const onCopyButtonClick = () => {
    const text = message.content;
    if (!text) {
      return;
    }
    if (typeof text !== 'string') {
      const foundText = text.find((m) => m.type === 'text') as ChatTextContentPart | undefined;
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
          {copied ? (
            <Check className='rad:w-4 rad:h-4' />
          ) : (
            <Clipboard className='rad:w-4 rad:h-4' />
          )}
        </IconWrapper>
      </Tooltip>
    </>
  );
}

function Edit() {
  const { message, isEditing, toggleIsEditing } = useChatMessage();

  if (message.role !== 'user') {
    return null;
  }

  return (
    <>
      <Tooltip title={isEditing ? '編集を中断する' : 'このメッセージからやり直す'}>
        <IconWrapper onClick={toggleIsEditing}>
          {isEditing ? <X className='rad:w-4 rad:h-4' /> : <Pencil className='rad:w-4 rad:h-4' />}
        </IconWrapper>
      </Tooltip>
    </>
  );
}

function Regenerate() {
  const { message } = useChatMessage();
  const { regenerate } = useRegenerateChatMessage();

  if (message.role !== 'assistant') {
    return null;
  }

  return (
    <>
      <Tooltip title='このメッセージを再生成'>
        <IconWrapper onClick={regenerate}>
          <RotateCw className='rad:w-4 rad:h-4' />
        </IconWrapper>
      </Tooltip>
    </>
  );
}

function ToggleFold() {
  const { isCollapsed, isCollapsible, toggleIsCollapsed } = useChatMessage();

  if (!isCollapsible) {
    return null;
  }

  return (
    <Tooltip title={isCollapsed ? '全文を表示' : 'メッセージを折りたたむ'}>
      <IconWrapper onClick={toggleIsCollapsed}>
        {isCollapsed ? (
          <ChevronDown className='rad:w-4 rad:h-4' />
        ) : (
          <ChevronUp className='rad:w-4 rad:h-4' />
        )}
      </IconWrapper>
    </Tooltip>
  );
}

export default function ChatCommands() {
  return (
    <div className='rad:p-4!'>
      <div className='rad:hidden rad:lg:flex rad:gap-2'>
        <ToggleFold />
        <Edit />
        <Regenerate />
        <Copy />
      </div>
    </div>
  );
}
