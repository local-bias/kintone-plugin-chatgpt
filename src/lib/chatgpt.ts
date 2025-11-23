import { ChatMessageContent } from './static';

export const getTextFromMessageContent = (content: ChatMessageContent): string => {
  if (!content) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  for (const m of content) {
    if (m.type === 'text') {
      return m.text;
    }
  }
  return '';
};
