import { ChatMessage } from '@/lib/static';
import { useAtomCallback } from 'jotai/utils';
import React, { createContext, ReactNode, useCallback, useContext } from 'react';
import invariant from 'tiny-invariant';
import { useMessageController } from '../hooks/message-controller';
import { selectedHistoryAtom } from '../states/states';

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

  const regenerate = useAtomCallback(
    useCallback(
      async (get, set) => {
        const messageId = message.id;
        const chatHistory = get(selectedHistoryAtom);
        if (!chatHistory) {
          return;
        }
        const index = chatHistory.messages.findIndex((m) => m.id === messageId);
        if (index === -1) {
          return;
        }

        const newMessages = chatHistory.messages.slice(0, index);

        set(selectedHistoryAtom, { ...chatHistory, messages: newMessages });

        sendMessage();
      },
      [message]
    )
  );

  return { regenerate };
};
