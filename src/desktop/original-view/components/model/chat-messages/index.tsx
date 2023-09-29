import {
  apiErrorMessageState,
  chatMessagesState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import { CircularProgress, Skeleton } from '@mui/material';
import React, { FCX, PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import MessageContainer from './message-container';
import Message from './message';
import ErrorMessage from './error-message';
import Empty from './empty';

const Component: FCX<PropsWithChildren> = ({ className }) => {
  const chatMessages = useRecoilValue(chatMessagesState);
  const watingForResponse = useRecoilValue(waitingForResponseState);
  const apiErrorMessage = useRecoilValue(apiErrorMessageState);

  const displayMessages = chatMessages.filter(
    (message) => message.role === 'user' || message.role === 'assistant'
  );

  return (
    <div className={className}>
      {chatMessages.length === 0 && <Empty />}
      <div className='messages'>
        {displayMessages.map((message, index) => (
          <div key={index} className='[&:nth-of-type(n+1)]:border-t border-gray-300'>
            <MessageContainer role={message.role}>
              <Message
                message={message.content}
                typing={message.role === 'assistant' && index === displayMessages.length - 1}
                speed={message.content.length > 500 ? 5 : 10}
              />
            </MessageContainer>
          </div>
        ))}
        {watingForResponse && (
          <div className='[&:nth-of-type(n+1)]:border-t border-gray-300'>
            <MessageContainer role='assistant'>
              <div className='flex gap-8 items-center'>
                <div className='flex justify-center'>
                  <div className='animate-spin h-8 w-8 bg-gray-300 rounded-xl'></div>
                </div>
                <p className=''>回答を生成しています・・・</p>
              </div>
            </MessageContainer>
          </div>
        )}
        {apiErrorMessage && (
          <MessageContainer role='assistant'>
            <ErrorMessage>{apiErrorMessage}</ErrorMessage>
          </MessageContainer>
        )}
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 180px);

  .messages {
    width: 100%;
    .message-container:nth-of-type(2n) {
      background-color: #0000000a;
    }
  }
`;

export default StyledComponent;
