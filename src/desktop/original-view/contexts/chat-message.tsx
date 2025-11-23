import { shouldCollapseUserMessage } from '@/desktop/original-view/components/model/chat-messages/utils';
import { ChatMessage } from '@/lib/static';
import { useAtomCallback } from 'jotai/utils';
import React, { createContext, ReactNode, useCallback, useContext } from 'react';
import invariant from 'tiny-invariant';
import { handleSendMessageAtom } from '../states/chat-message';
import { selectedHistoryAtom } from '../states/states';

type ChatMessageContextType = {
  message: ChatMessage;
  isEditing: boolean;
  toggleIsEditing: () => void;
  isCollapsed: boolean;
  isCollapsible: boolean;
  toggleIsCollapsed: () => void;
};

const ChatMessageContext = createContext<ChatMessageContextType | undefined>(undefined);

type ChatMessageProviderProps = Omit<
  ChatMessageContextType,
  'isEditing' | 'toggleIsEditing' | 'isCollapsed' | 'isCollapsible' | 'toggleIsCollapsed'
> & {
  children: ReactNode;
};

export const ChatMessageProvider: React.FC<ChatMessageProviderProps> = ({ children, message }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const isCollapsible = shouldCollapseUserMessage(message);
  const [isCollapsed, setIsCollapsed] = React.useState(isCollapsible);

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const toggleIsCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  React.useEffect(() => {
    setIsCollapsed(isCollapsible);
  }, [isCollapsible, message.id]);

  return (
    <ChatMessageContext.Provider
      value={{
        message,
        isEditing,
        toggleIsEditing,
        isCollapsed,
        isCollapsible,
        toggleIsCollapsed,
      }}
    >
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

        await set(handleSendMessageAtom);
      },
      [message]
    )
  );

  return { regenerate };
};
