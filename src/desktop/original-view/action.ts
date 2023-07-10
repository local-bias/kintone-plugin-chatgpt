import { OPENAI_ENDPOINT } from '@/lib/static';
import { CreateChatCompletionRequest, CreateChatCompletionResponse } from 'openai';
import { marked } from 'marked';
import { PLUGIN_ID } from '@/lib/global';
import { ChatHistory, ChatMessage } from './states/states';
import {
  addRecord,
  getRecords,
  updateRecord,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';

marked.use({ mangle: false, headerIds: false });

export const fetchChatCompletion = async (params: { model: string; messages: ChatMessage[] }) => {
  const { model, messages } = params;

  const requestBody: CreateChatCompletionRequest = {
    model,
    temperature: 0.7,
    max_tokens: process.env.NODE_ENV === 'development' ? 512 : 2048,
    messages,
  };

  const [responseBody, responseCode, responseHeader] = await kintone.plugin.app.proxy(
    PLUGIN_ID,
    OPENAI_ENDPOINT,
    'POST',
    {},
    requestBody
  );

  const completionResponse: CreateChatCompletionResponse = JSON.parse(responseBody);

  if (responseCode !== 200) {
    const errorResponse = completionResponse as any;
    if (errorResponse?.error?.message) {
      throw new Error(errorResponse.error.message);
    }
    throw new Error(
      'APIの呼び出しに失敗しました。再度実行しても失敗する場合は、管理者にお問い合わせください。'
    );
  }

  process.env.NODE_ENV === 'development' &&
    console.log({ completionResponse, responseCode, responseHeader });

  process.env.NODE_ENV === 'development' &&
    console.log(`このやり取りで${completionResponse.usage?.total_tokens}トークン消費しました`);

  return completionResponse;
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
      },
    });
  }
};
