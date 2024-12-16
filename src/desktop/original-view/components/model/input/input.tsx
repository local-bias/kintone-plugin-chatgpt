import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { useChatHistory } from '@/desktop/original-view/hooks/use-chat-history';
import { inputTextAtom } from '@/desktop/original-view/states/states';
import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { useAtom, useAtomValue } from 'jotai';
import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';

const Component: FC = () => {
  const commonConfig = useAtomValue(pluginCommonConfigAtom);
  const [input, setInput] = useAtom(inputTextAtom);
  const { enablesEnter, enablesShiftEnter } = commonConfig;
  const { sendMessage } = useMessageController();
  const { pushUserMessage } = useChatHistory();

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput(e.target.value);
  };

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = async (event) => {
    const isEnter = event.key === 'Enter';
    const isShift = event.shiftKey;

    if ((enablesEnter && isEnter && !isShift) || (enablesShiftEnter && isEnter && isShift)) {
      event.preventDefault();
      await pushUserMessage();
      await sendMessage();
    }
  };

  return (
    <textarea
      style={{ height: input.split('\n').length * 24 }}
      className='flex-1 min-h-[60px] resize-none border-0 p-4 placeholder:text-gray-400'
      value={input}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder='ここにメッセージを入力'
    />
  );
};

export default Component;
