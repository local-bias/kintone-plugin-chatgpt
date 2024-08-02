import OpenAI from 'openai';
import config from 'plugin.config.mjs';

export const OPENAI_ENDPOINT_ROOT = 'https://api.openai.com';
export const OPENAI_ENDPOINT = `${OPENAI_ENDPOINT_ROOT}/v1/chat/completions`;

export const PLUGIN_NAME = config.manifest.base.name.ja;

export const VIEW_ROOT_ID = `ribbit-chatgpt-plugin-root`;

export const URL_INQUIRY = 'https://form.konomi.app';
export const URL_PROMOTION = 'https://promotion.konomi.app/kintone-plugin';
export const URL_BANNER = 'https://promotion.konomi.app/kintone-plugin/sidebar';

export const OPENAI_MODELS = [
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4-turbo',
  'gpt-4-vision-preview',
  'gpt-4',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo',
];

export const IMAGE_SUPPORTED_MODELS = [
  'gpt-4-vision-preview',
  'gpt-4-turbo',
  'gpt-4o',
  'gpt-4o-mini',
];

export const URL_QUERY_CHAT_ID = 'chat_id';

export type AnyChatHistory = ChatHistoryV1 | ChatHistoryV2 | ChatHistoryV3 | ChatHistoryV4;

export type ChatHistory = ChatHistoryV4;

export type ChatMessageRole = ChatHistory['messages'][number]['role'];

export type ChatMessage = ChatHistory['messages'][number];

type ChatHistoryV1 = {
  version: 1;
  id: string;
  title: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
};

type ChatHistoryV2 = {
  version: 2;
  id: string;
  iconUrl: string;
  title: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
};

type ChatHistoryV3 = {
  version: 3;
  id: string;
  aiModel: string;
  temperature: number;
  maxTokens: number;
  iconUrl: string;
  title: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
};

type ChatHistoryV4 = {
  version: 4;
  id: string;
  aiModel: string;
  temperature: number;
  maxTokens: number;
  iconUrl: string;
  title: string;
  messages: (
    | OpenAI.ChatCompletionSystemMessageParam
    | OpenAI.ChatCompletionUserMessageParam
    | OpenAI.ChatCompletionAssistantMessageParam
  )[];
};
