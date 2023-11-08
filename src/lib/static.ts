import { OpenAI } from 'openai';
import manifest from '../../plugin/manifest.json';

export const OPENAI_ENDPOINT_ROOT = 'https://api.openai.com';
export const OPENAI_ENDPOINT = `${OPENAI_ENDPOINT_ROOT}/v1/chat/completions`;

export const PLUGIN_KEY = 'chatgpt';
export const PLUGIN_NAME = manifest.name.ja;
export const PLUGIN_VERSION = manifest.version;

export const LOCAL_STORAGE_PREFIX = 'ribbit-kintone-plugin-';
export const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}${PLUGIN_KEY}`;

export const VIEW_ROOT_ID = `ribbit-chatgpt-plugin-root`;

export const URL_HOMEPAGE = manifest.homepage_url.ja;
export const URL_INQUIRY = 'https://form.konomi.app';
export const URL_PROMOTION = 'https://promotion.konomi.app/kintone-plugin';
export const URL_BANNER = 'https://promotion.konomi.app/kintone-plugin/sidebar';
export const URL_PLUGIN_LIST = 'https://ribbit.konomi.app/kintone-plugin';

export const OPENAI_MODELS = ['gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-4', 'gpt-4-1106-preview'];

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ChatHistory = ChatHistoryV1 | ChatHistoryV2 | ChatHistoryV3;

export type LatestChatHistory = ChatHistoryV3;

type ChatHistoryV1 = { version: 1; id: string; title: string; messages: ChatMessage[] };

type ChatHistoryV2 = {
  version: 2;
  id: string;
  iconUrl: string;
  title: string;
  messages: ChatMessage[];
};

type ChatHistoryV3 = {
  version: 3;
  id: string;
  aiModel: string;
  temperature: number;
  maxTokens: number;
  iconUrl: string;
  title: string;
  messages: ChatMessage[];
};
