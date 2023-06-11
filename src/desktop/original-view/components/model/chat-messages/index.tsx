import {
  apiErrorMessageState,
  chatMessagesState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import React, { FCX, PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import Message from './message';
import Empty from './empty';

const Component: FCX<PropsWithChildren> = ({ className }) => {
  const chatMessages = useRecoilValue(chatMessagesState);
  const watingForResponse = useRecoilValue(waitingForResponseState);
  const apiErrorMessage = useRecoilValue(apiErrorMessageState);

  return (
    <div className={className}>
      {chatMessages.length === 0 && <Empty />}
      <div className='messages'>
        {chatMessages.map((message, index) => (
          <div key={index} className='message-container'>
            <Message role={message.role}>
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
            </Message>
          </div>
        ))}
        {watingForResponse && (
          <div className='message-container'>
            <Message role='assistant'>
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width={200} />
            </Message>
          </div>
        )}
        {apiErrorMessage && (
          <div className='message-container'>
            <Message role='assistant'>{apiErrorMessage}</Message>
          </div>
        )}
      </div>
      <div className='spacer'></div>
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

  .message-container {
    padding: 1.5em 1em;
    border-bottom: 1px solid #0001;
  }

  .message {
    max-width: 900px;
    margin: 0 auto;
  }

  .spacer {
    height: 140px;
  }
`;

export default StyledComponent;
