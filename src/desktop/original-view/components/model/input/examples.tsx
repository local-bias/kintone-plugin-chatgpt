import {
  displayingChatMessagesAtom,
  inputTextAtom,
  selectedPluginConditionAtom,
} from '@/desktop/original-view/states/states';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { FC } from 'react';

const Component: FC = () => {
  const condition = useAtomValue(selectedPluginConditionAtom);
  const setInput = useSetAtom(inputTextAtom);

  const examples = condition.examples.filter((ex) => ex);

  const onClick = (example: string) => {
    setInput(example);
  };

  if (!examples.length) {
    return null;
  }

  return (
    <div className='hidden md:flex gap-6'>
      <div className='basis-8 text-blue-700'>
        <ChatBubbleOvalLeftEllipsisIcon />
      </div>
      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
        {examples.map((example, index) => (
          <div
            key={index}
            className='p-3 rounded-md border transition-all border-solid border-blue-700 hover:bg-blue-50 text-blue-700 bg-opacity-80 cursor-pointer'
            onClick={() => onClick(example)}
          >
            {example}
          </div>
        ))}
      </div>
    </div>
  );
};

const Container: FC = () => {
  const messages = useAtomValue(displayingChatMessagesAtom);

  if (messages.length) {
    return null;
  }

  return <Component />;
};

export default Container;
