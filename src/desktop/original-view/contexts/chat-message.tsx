import { ChatMessage } from '@/lib/static';
import React, { createContext, useContext, ReactNode } from 'react';

type ChatMessageContextType = {
  message: ChatMessage;
};

const ChatMessageContext = createContext<ChatMessageContextType | undefined>(undefined);

type ChatMessageProviderProps = ChatMessageContextType & {
  children: ReactNode;
};

export const ChatMessageProvider: React.FC<ChatMessageProviderProps> = (props) => {
  const { children, ...rest } = props;
  return <ChatMessageContext.Provider value={rest}>{children}</ChatMessageContext.Provider>;
};

export const useChatMessage = () => {
  const context = useContext(ChatMessageContext);
  if (context === undefined) {
    throw new Error('useChatMessage must be used within a ChatMessageProvider');
  }
  return context;
};
