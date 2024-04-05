import { PLUGIN_ID } from '@/lib/global';
import {
  AnyChatHistory,
  ChatMessage,
  ChatHistory,
  OPENAI_ENDPOINT,
  OPENAI_MODELS,
} from '@/lib/static';
import {
  addRecord,
  getRecords,
  updateRecord,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';
import { marked } from 'marked';
import { OpenAI } from 'openai';

export const migrateChatHistory = (chatHistory: AnyChatHistory): ChatHistory => {
  switch (chatHistory.version) {
    case 4:
      return chatHistory;
    case 3:
      return {
        ...chatHistory,
        version: 4,
      };
    case 2:
      return {
        ...chatHistory,
        version: 4,
        aiModel: OPENAI_MODELS[0],
        temperature: 0.7,
        maxTokens: 0,
      };
    case undefined:
    default:
    case 1:
      return {
        ...chatHistory,
        version: 4,
        iconUrl: '',
        aiModel: OPENAI_MODELS[0],
        temperature: 0.7,
        maxTokens: 0,
      };
  }
};

export const createNewChatHistory = (params: Omit<ChatHistory, 'version'>): ChatHistory => {
  return { version: 4, ...params };
};

export const fetchChatCompletion = async (params: {
  model: string;
  temperature: number;
  maxTokens: number;
  messages: ChatMessage[];
}) => {
  const { model, temperature, maxTokens, messages } = params;

  process.env.NODE_ENV === 'development' && console.group("🧠 openai's API call");

  const requestBody: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
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

export const getHTMLfromMarkdown = (markdown: string): string => {
  return marked(markdown, { async: false }) as string;
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

export const getChatTitle = (message: ChatMessage): string => {
  const { content } = message;
  console.log({ message });
  if (!content) {
    return '空のメッセージ';
  }
  if (typeof content === 'string') {
    return content.slice(0, 16);
  }
  const found = content.find((m) => m.type === 'text') as any | undefined;
  return (found?.text ?? '空のメッセージ').slice(0, 16);
};
