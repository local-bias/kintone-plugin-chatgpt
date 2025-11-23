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
import { PropsWithChildren } from 'react';
import { ChatContent } from '../../layout/chat-content';
import Commands from './commands';
import Empty from './empty';
import ErrorMessage from './error-message';
import Message from './message';
import MessageContainer from './message-container';

function ChatMessages({ className, children }: PropsWithChildren<{ className?: string }>) {
  const chatMessages = useAtomValue(displayingChatMessagesAtom);
  const aiState = useAtomValue(aiStateAtom);
  const apiErrorMessage = useAtomValue(apiErrorMessageAtom);

  return (
    <div
      className={cn(className, {
        'rad:pb-32!': isMobile(),
      })}
    >
      {chatMessages.length === 0 && <Empty />}
      <div className='messages'>
        {chatMessages.map((message) => (
          <ChatMessageProvider key={message.id} message={message}>
            <ChatContent className='rad:group/message rad:grid rad:grid-cols-1 rad:lg:grid-cols-[1fr_900px_1fr] rad:[&>div]:w-full'>
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
              <div className='rad:flex rad:gap-2 rad:items-center'>
                <div className='rad:flex rad:justify-center rad:overflow-hidden'>
                  <Loader size={16} />
                </div>
                <div className='rad:text-gray-500 rad:text-sm'>考え中・・・</div>
              </div>
            </MessageContainer>
          </ChatContent>
        )}
        {aiState === 'authorizing' && (
          <ChatContent>
            <MessageContainer role='assistant'>
              <div className='rad:flex rad:gap-2 rad:items-center'>
                <div className='rad:flex rad:justify-center rad:overflow-hidden'>
                  <Loader size={16} />
                </div>
                <div className='rad:text-gray-500 rad:text-sm'>認証中・・・</div>
              </div>
            </MessageContainer>
          </ChatContent>
        )}
        {apiErrorMessage && <ErrorMessage>{apiErrorMessage}</ErrorMessage>}
      </div>
    </div>
  );
}

const StyledChatMessages = styled(ChatMessages)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 200px);
`;

export default StyledChatMessages;
