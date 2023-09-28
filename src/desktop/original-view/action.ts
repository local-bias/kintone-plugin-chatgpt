import { OPENAI_ENDPOINT } from '@/lib/static';
import { OpenAI } from 'openai';
import { marked } from 'marked';
import { PLUGIN_ID } from '@/lib/global';
import { ChatHistory, ChatMessage } from './states/states';
import {
  addRecord,
  getRecords,
  updateRecord,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';

export const fetchChatCompletion = async (params: {
  model: string;
  temperature: number;
  messages: ChatMessage[];
}) => {
  const { model, temperature, messages } = params;

  const requestBody: OpenAI.Chat.ChatCompletionCreateParams = { model, temperature, messages };

  const [responseBody, responseCode, responseHeader] = await kintone.plugin.app.proxy(
    PLUGIN_ID,
    OPENAI_ENDPOINT,
    'POST',
    {},
    requestBody
  );

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

  return chatCompletion;
};

export const getHTMLfromMarkdown = (markdown: string) => {
  const html = marked(markdown);
  return html;
};

export const logChatCompletion = async (params: {
  chatHistory: ChatHistory;
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
