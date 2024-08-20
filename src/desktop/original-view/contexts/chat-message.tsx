import { ChatMessage } from '@/lib/static';
import React, { createContext, useContext, ReactNode } from 'react';
import invariant from 'tiny-invariant';

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
