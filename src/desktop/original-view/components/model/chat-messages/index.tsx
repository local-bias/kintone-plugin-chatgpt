import {
  apiErrorMessageState,
  chatMessagesState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
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
          <div key={index} className='message-container'>
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
          <div className='message-container'>
            <MessageContainer role='assistant'>
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width={200} />
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
  min-height: calc(100vh - 300px);

  .messages {
    width: 100%;
    .message-container:nth-of-type(2n) {
      background-color: #0000000a;
    }
  }
`;

export default StyledComponent;
