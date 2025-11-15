import { ChatMessageProvider } from '@/desktop/original-view/contexts/chat-message';
import {
  aiStateAtom,
  apiErrorMessageAtom,
  displayingChatMessagesAtom,
} from '@/desktop/original-view/states/states';
import { cn } from '@/lib/utils';
import styled from '@emotion/styled';
import { isMobile } from '@konomi-app/kintone-utilities';
import { Loader } from '@konomi-app/ui-react';
import { useAtomValue } from 'jotai';
import { FCX, PropsWithChildren } from 'react';
import { ChatContent } from '../../layout/chat-content';
import Commands from './commands';
import Empty from './empty';
import ErrorMessage from './error-message';
import Message from './message';
import MessageContainer from './message-container';

const Component: FCX<PropsWithChildren> = ({ className }) => {
  const chatMessages = useAtomValue(displayingChatMessagesAtom);
  const aiState = useAtomValue(aiStateAtom);
  const apiErrorMessage = useAtomValue(apiErrorMessageAtom);

  return (
    <div
      className={cn(className, {
        'pb-32': isMobile(),
      })}
    >
      {chatMessages.length === 0 && <Empty />}
      <div className='messages'>
        {chatMessages.map((message) => (
          <ChatMessageProvider key={message.id} message={message}>
            <ChatContent className='group/message grid grid-cols-1 lg:grid-cols-[1fr_900px_1fr] [&>div]:w-full'>
              <div></div>
              <MessageContainer role={message.role}>
                <Message message={message.content} />
              </MessageContainer>
              <Commands />
            </ChatContent>
          </ChatMessageProvider>
        ))}
        {aiState === 'loading' && (
          <ChatContent>
            <MessageContainer role='assistant'>
              <div className='flex gap-2 items-center'>
                <div className='flex justify-center overflow-hidden'>
                  <Loader size={16} />
                </div>
                <div className='text-gray-500'>考え中・・・</div>
              </div>
            </MessageContainer>
          </ChatContent>
        )}
        {aiState === 'authorizing' && (
          <ChatContent>
            <MessageContainer role='assistant'>
              <div className='flex gap-2 items-center'>
                <div className='flex justify-center overflow-hidden'>
                  <Loader size={16} />
                </div>
                <div className='text-gray-500'>認証中・・・</div>
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
