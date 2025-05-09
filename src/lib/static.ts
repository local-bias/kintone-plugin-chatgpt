import OpenAI from 'openai';
import { ChatModel } from 'openai/resources';
import config from 'plugin.config.mjs';

export const OPENAI_ENDPOINT_ROOT = 'https://api.openai.com';
export const OPENAI_ENDPOINT = `${OPENAI_ENDPOINT_ROOT}/v1/chat/completions`;

export const PLUGIN_NAME = config.manifest.base.name.ja;

export const VIEW_ROOT_ID = `ribbit-chatgpt-plugin-root`;

export const URL_INQUIRY = 'https://form.konomi.app';
export const URL_PROMOTION = 'https://promotion.konomi.app/kintone-plugin';
export const URL_BANNER = 'https://promotion.konomi.app/kintone-plugin/sidebar';

export const OPENAI_MODELS = [
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4',
  'o4-mini',
  'o3-mini',
] satisfies ChatModel[];

export const O1_SERIES_MODELS = ['o1', 'o1-preview', 'o3-mini', 'o4-mini'] satisfies ChatModel[];

export const URL_QUERY_CHAT_ID = 'chat_id';

export type AnyChatHistory =
  | ChatHistoryV1
  | ChatHistoryV2
  | ChatHistoryV3
  | ChatHistoryV4
  | ChatHistoryV5;

export type ChatHistory = ChatHistoryV5;

export type ChatMessageRole = ChatHistory['messages'][number]['role'];

export type ChatMessage = ChatHistory['messages'][number];

type ChatHistoryV5 = Omit<ChatHistoryV4, 'version' | 'messages'> & {
  version: 5;
  messages: (ChatHistoryV4['messages'][number] & { id: string })[];
};

type ChatHistoryV4 = Omit<ChatHistoryV3, 'version' | 'messages'> & {
  version: 4;
  messages: (
    | OpenAI.ChatCompletionSystemMessageParam
    | OpenAI.ChatCompletionUserMessageParam
    | OpenAI.ChatCompletionAssistantMessageParam
  )[];
};

type ChatHistoryV3 = Omit<ChatHistoryV2, 'version'> & {
  version: 3;
  aiModel: string;
  temperature: number;
  maxTokens: number;
};

type ChatHistoryV2 = Omit<ChatHistoryV1, 'version'> & {
  version: 2;
  iconUrl: string;
};

type ChatHistoryV1 = {
  version: 1;
  id: string;
  title: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
};
