import OpenAI from 'openai';

type Message =
  | OpenAI.Chat.Completions.ChatCompletionSystemMessageParam
  | OpenAI.Chat.Completions.ChatCompletionUserMessageParam
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam;

export const getTextFromMessageContent = (content: Message['content']): string => {
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
