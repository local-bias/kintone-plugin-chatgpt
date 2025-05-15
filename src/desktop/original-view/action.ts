import { kintoneApiFetch } from '@/lib/api';
import { isDev, isProd } from '@/lib/global';
import {
  AnyChatHistory,
  ChatHistory,
  ChatMessage,
  OPENAI_ENDPOINT,
  OPENAI_MODELS,
  O1_SERIES_MODELS,
  OPENROUTER_CHAT_COMPLETION_ENDPOINT,
} from '@/lib/static';
import { AiProviderType } from '@/schema/plugin-config';
import {
  addRecord,
  getRecords,
  updateRecord,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';
import { marked } from 'marked';
import { nanoid } from 'nanoid';
import { OpenAI } from 'openai';

export const migrateChatHistory = (chatHistory: AnyChatHistory): ChatHistory => {
  switch (chatHistory.version) {
    case undefined:
    case 1:
      return migrateChatHistory({ ...chatHistory, version: 2, iconUrl: '' });
    case 2:
      return migrateChatHistory({
        ...chatHistory,
        version: 3,
        aiModel: OPENAI_MODELS[0],
        temperature: 0.7,
        maxTokens: 0,
      });
    case 3:
      return migrateChatHistory({ ...chatHistory, version: 4 });
    case 4:
      return migrateChatHistory({
        ...chatHistory,
        version: 5,
        messages: chatHistory.messages.map((m) => ({ ...m, id: nanoid() })),
      });
    case 5:
    default:
      return chatHistory;
  }
};

export const createNewChatHistory = (params: Omit<ChatHistory, 'version'>): ChatHistory => {
  return { version: 5, ...params };
};

export const fetchChatCompletion = async (params: {
  model: string;
  temperature: number;
  maxTokens: number;
  messages: ChatMessage[];
  providerType?: AiProviderType;
}) => {
  const { model, temperature, maxTokens, messages, providerType = 'openai' } = params;

  isDev && console.group("🧠 openai's API call");

  let max_tokens = maxTokens === 0 ? undefined : maxTokens;

  // 画像が含まれている場合はmax_tokensの指定が必須
  if (
    !max_tokens &&
    messages.some((m) => Array.isArray(m.content) && m.content.some((c) => c.type === 'image_url'))
  ) {
    max_tokens = 2048;
  }
  const sendingMessages = messages.map<OpenAI.Chat.Completions.ChatCompletionMessageParam>((m) => {
    // 一部のリクエストでは、idを含めているとエラーになるため、idを削除する
    const { id, ...rest } = m;
    return rest;
  });

  const requestBody: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
    model,
    temperature,
    max_completion_tokens: max_tokens,
    messages: sendingMessages,
    response_format: {
      type: 'text',
    },
  };
  if (O1_SERIES_MODELS.includes(model as any)) {
    delete requestBody.temperature;
    requestBody.reasoning_effort = 'low';
  }

  isDev && console.time("openai's API call");
  isDev && console.log('OpenAI - APIリクエスト', requestBody);

  let response: Response;
  if (providerType === 'openai') {
    response = await kintoneApiFetch(OPENAI_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  } else {
    response = await kintoneApiFetch(OPENROUTER_CHAT_COMPLETION_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        ...requestBody,
      }),
    });
  }

  !isProd && console.timeEnd("openai's API call");

  const chatCompletion: OpenAI.Chat.ChatCompletion = await response.json();

  !isProd &&
    console.log('OpenAI - APIレスポンス', {
      responseBody: chatCompletion,
      responseCode: response.status,
      responseHeader: response.headers,
    });

  if (response.status !== 200) {
    const errorResponse = chatCompletion as any;
    if (errorResponse?.error?.message) {
      throw new Error(errorResponse.error.message);
    }
    throw new Error(
      'APIの呼び出しに失敗しました。再度実行しても失敗する場合は、管理者にお問い合わせください。'
    );
  }

  isDev && console.log(`このやり取りで${chatCompletion.usage?.total_tokens}トークン消費しました`);

  isDev && console.groupEnd();

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
        debug: isDev,
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
        debug: isDev,
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
