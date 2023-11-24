import {
  apiErrorMessageState,
  chatMessagesState,
  displayChatMessagesState,
  isWaitingForAIState,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import React, { FCX, PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import MessageContainer from './message-container';
import Message from './message';
import ErrorMessage from './error-message';
import Empty from './empty';
import { ChatContent } from '../../layout/chat-content';
import { Loader } from '@konomi-app/ui-react';

const Component: FCX<PropsWithChildren> = ({ className }) => {
  const chatMessages = useRecoilValue(displayChatMessagesState);
  const isWaitingForAI = useRecoilValue(isWaitingForAIState);
  const apiErrorMessage = useRecoilValue(apiErrorMessageState);

  return (
    <div className={className}>
      {chatMessages.length === 0 && <Empty />}
      <div className='messages'>
        {chatMessages.map((message, index) => (
          <ChatContent key={index}>
            <MessageContainer role={message.role}>
              <Message
                message={message.content}
                typing={message.role === 'assistant' && index === chatMessages.length - 1}
                speed={message.content.length > 500 ? 5 : 10}
              />
            </MessageContainer>
          </ChatContent>
        ))}
        {isWaitingForAI && (
          <ChatContent>
            <MessageContainer role='assistant'>
              <div className='flex gap-8 items-center'>
                <div className='flex justify-center overflow-hidden'>
                  <Loader size={32} />
                </div>
                <p className=''>回答を生成しています・・・</p>
              </div>
            </MessageContainer>
          </ChatContent>
        )}
        {apiErrorMessage && <ErrorMessage>{apiErrorMessage}</ErrorMessage>}
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 200px);

  .messages {
    width: 100%;
    .message-container:nth-of-type(2n) {
      background-color: #0000000a;
    }
  }
`;

export default StyledComponent;
