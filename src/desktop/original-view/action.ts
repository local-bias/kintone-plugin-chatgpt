import { PLUGIN_ID } from '@/lib/global';
import { ChatHistory, ChatMessage, LatestChatHistory, OPENAI_ENDPOINT } from '@/lib/static';
import {
  addRecord,
  getRecords,
  updateRecord,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';
import { marked } from 'marked';
import { OpenAI } from 'openai';

export const migrateChatHistory = (chatHistory: ChatHistory): LatestChatHistory => {
  switch (chatHistory.version) {
    case undefined:
    case 1:
      return {
        ...chatHistory,
        version: 2,
        iconUrl: '',
      };
    case 2:
      return chatHistory;
    default:
      throw new Error('不明なバージョンのチャット履歴です');
  }
};

export const createNewChatHistory = (params: Partial<LatestChatHistory>): LatestChatHistory => {
  return { version: 2, id: '', iconUrl: '', title: '', messages: [], ...params };
};

export const fetchChatCompletion = async (params: {
  model: string;
  temperature: number;
  maxTokens: number;
  messages: ChatMessage[];
}) => {
  const { model, temperature, maxTokens, messages } = params;

  process.env.NODE_ENV === 'development' && console.group("🧠 openai's API call");

  const requestBody: OpenAI.Chat.ChatCompletionCreateParams = {
    model,
    temperature,
    max_tokens: maxTokens === 0 ? undefined : maxTokens,
    messages,
  };

  process.env.NODE_ENV === 'development' && console.time("openai's API call");
  process.env.NODE_ENV === 'development' && console.log('OpenAI - APIリクエスト', requestBody);

  const [responseBody, responseCode, responseHeader] = await kintone.plugin.app.proxy(
    PLUGIN_ID,
    OPENAI_ENDPOINT,
    'POST',
    {},
    requestBody
  );

  process.env.NODE_ENV === 'development' && console.timeEnd("openai's API call");
  process.env.NODE_ENV === 'development' &&
    console.log('OpenAI - APIレスポンス', { responseBody, responseCode, responseHeader });

  const chatCompletion: OpenAI.Chat.ChatCompletion = JSON.parse(responseBody);

  if (responseCode !== 200) {
    const errorResponse = chatCompletion as any;
    if (errorResponse?.error?.message) {
      throw new Error(errorResponse.error.message);
    }
    throw new Error(
      'APIの呼び出しに失敗しました。再度実行しても失敗する場合は、管理者にお問い合わせください。'
    );
  }

  process.env.NODE_ENV === 'development' &&
    console.log({ chatCompletion, responseCode, responseHeader });

  process.env.NODE_ENV === 'development' &&
    console.log(`このやり取りで${chatCompletion.usage?.total_tokens}トークン消費しました`);

  process.env.NODE_ENV === 'development' && console.groupEnd();

  return chatCompletion;
};

export const getHTMLfromMarkdown = (markdown: string) => {
  const html = marked(markdown);
  return html;
};

export const logChatCompletion = async (params: {
  chatHistory: LatestChatHistory;
  appId: string;
  spaceId?: string;
  keyFieldCode: string;
  contentFieldCode: string;
}) => {
  const { chatHistory, appId, spaceId, keyFieldCode, contentFieldCode } = params;

  const chatId = chatHistory.id;

  const { records } = await withSpaceIdFallback({
    spaceId,
    func: getRecords,
    funcParams: { app: appId, query: `${keyFieldCode} = "${chatId}"`, fields: ['$id'] },
  });

  if (!records.length) {
    await withSpaceIdFallback({
      spaceId,
      func: addRecord,
      funcParams: {
        app: appId,
        record: {
          [keyFieldCode]: { value: chatId },
          [contentFieldCode]: { value: JSON.stringify(chatHistory) },
        },
        debug: process.env.NODE_ENV === 'development',
      },
    });
  } else {
    await withSpaceIdFallback({
      spaceId,
      func: updateRecord,
      funcParams: {
        app: appId,
        id: records[0].$id.value,
        record: {
          [keyFieldCode]: { value: chatId },
          [contentFieldCode]: { value: JSON.stringify(chatHistory) },
        },
        debug: process.env.NODE_ENV === 'development',
      },
    });
  }
};
