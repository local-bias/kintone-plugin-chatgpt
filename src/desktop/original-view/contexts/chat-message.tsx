import { ChatMessage } from '@/lib/static';
import React, { createContext, useContext, ReactNode } from 'react';
import { useRecoilCallback } from 'recoil';
import invariant from 'tiny-invariant';
import { selectedHistoryState } from '../states/states';
import { useMessageController } from '../hooks/message-controller';

type ChatMessageContextType = {
  message: ChatMessage;
  isEditing: boolean;
  toggleIsEditing: () => void;
};

const ChatMessageContext = createContext<ChatMessageContextType | undefined>(undefined);

type ChatMessageProviderProps = Omit<ChatMessageContextType, 'isEditing' | 'toggleIsEditing'> & {
  children: ReactNode;
};

export const ChatMessageProvider: React.FC<ChatMessageProviderProps> = (props) => {
  const { children, ...rest } = props;
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <ChatMessageContext.Provider value={{ ...rest, isEditing, toggleIsEditing }}>
      {children}
    </ChatMessageContext.Provider>
  );
};

export const useChatMessage = () => {
  const context = useContext(ChatMessageContext);
  invariant(context, 'useChatMessage must be used within a ChatMessageProvider');
  return context;
};

export const useRegenerateChatMessage = () => {
  const { message } = useChatMessage();
  const { sendMessage } = useMessageController();

  const regenerate = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const messageId = message.id;
        const chatHistory = await snapshot.getPromise(selectedHistoryState);
        if (!chatHistory) {
          return;
        }
        const index = chatHistory.messages.findIndex((m) => m.id === messageId);
        if (index === -1) {
          return;
        }

        const newMessages = chatHistory.messages.slice(0, index);

        set(selectedHistoryState, { ...chatHistory, messages: newMessages });

        sendMessage();
      },
    [message]
  );

  return { regenerate };
};
