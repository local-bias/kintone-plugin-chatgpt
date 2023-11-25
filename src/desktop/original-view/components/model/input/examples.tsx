import {
  displayChatMessagesState,
  inputTextState,
  selectedAssistantState,
} from '@/desktop/original-view/states/states';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';

const Component: FC = () => {
  const assistant = useRecoilValue(selectedAssistantState);

  const examples = assistant.examples.filter((ex) => ex);

  const onClick = useRecoilCallback(
    ({ set }) =>
      async (example: string) => {
        set(inputTextState, example);
      },
    []
  );

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
  const messages = useRecoilValue(displayChatMessagesState);

  if (messages.length) {
    return null;
  }

  return <Component />;
};

export default Container;
