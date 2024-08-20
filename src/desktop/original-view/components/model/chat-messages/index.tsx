import {
  apiErrorMessageState,
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
import { ChatMessageProvider } from '@/desktop/original-view/contexts/chat-message';
import Commands from './commands';

const Component: FCX<PropsWithChildren> = ({ className }) => {
  const chatMessages = useRecoilValue(displayChatMessagesState);
  const isWaitingForAI = useRecoilValue(isWaitingForAIState);
  const apiErrorMessage = useRecoilValue(apiErrorMessageState);

  return (
    <div className={className}>
      {chatMessages.length === 0 && <Empty />}
      <div className='messages'>
        {chatMessages.map((message) => (
          <ChatMessageProvider key={message.id} message={message}>
            <ChatContent className='group/message grid grid-cols-[1fr_900px_1fr] [&>div]:w-full'>
              <div></div>
              <MessageContainer role={message.role}>
                <Message message={message.content} />
              </MessageContainer>
              <Commands />
            </ChatContent>
          </ChatMessageProvider>
        ))}
        {isWaitingForAI && (
          <ChatContent>
            <MessageContainer role='assistant'>
              <div className='flex gap-8 items-center'>
                <div className='flex justify-center overflow-hidden'>
                  <Loader size={32} />
                </div>
                <div className=''>回答を生成しています・・・</div>
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
`;

export default StyledComponent;
