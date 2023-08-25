import { ChatCompletionRequestMessage } from 'openai';
import manifest from '../../plugin/manifest.json';

export const OPENAI_ENDPOINT_ROOT = 'https://api.openai.com';
export const OPENAI_ENDPOINT = `${OPENAI_ENDPOINT_ROOT}/v1/chat/completions`;

export const VIEW_ROOT_ID = `ribbit-chatgpt-plugin-root`;

export const PLUGIN_NAME = manifest.name.ja;

export const LOCAL_STORAGE_KEY = 'ribbit-kintone-plugin';

export const URL_HOMEPAGE = manifest.homepage_url.ja;
export const URL_INQUIRY = 'https://form.konomi.app';
export const URL_PROMOTION = 'https://promotion.konomi.app/kintone-plugin';
export const URL_BANNER = 'https://promotion.konomi.app/kintone-plugin/sidebar';

export const OPENAI_MODELS = ['gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-4'];

type LogDataV1 = {
  title: string;
  messages: ChatCompletionRequestMessage[];
};

type LogData = { version: 1 } & LogDataV1; // | { version: 2 } & LogDataV2 ...
