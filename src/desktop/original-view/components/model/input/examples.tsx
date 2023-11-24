import {
  displayChatMessagesState,
  inputTextState,
  selectedAssistantState,
} from '@/desktop/original-view/states/states';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

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
    <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-4'>
      {examples.map((example, index) => (
        <div
          key={index}
          className='p-4 rounded-md border transition-all bg-blue-700 hover:bg-blue-500 text-white bg-opacity-80 cursor-pointer'
          onClick={() => onClick(example)}
        >
          {example}
        </div>
      ))}
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
