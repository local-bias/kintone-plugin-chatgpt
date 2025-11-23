import { createEndpointAdapter } from '@/lib/adapters';
import { kintoneApiFetch } from '@/lib/api';
import type { ChatCompletionRequest } from '@/lib/endpoint-adapter';
import { isDev, isProd } from '@/lib/global';
import { AnyChatHistory, ChatHistory, ChatMessage, OPENAI_MODELS } from '@/lib/static';
import { ReasoningEffortType, VerbosityType } from '@/schema/ai';
import { AiProviderType } from '@/schema/plugin-config';
import {
  addRecord,
  getRecords,
  updateRecord,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';
import { marked } from 'marked';
import { nanoid } from 'nanoid';

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
      return migrateChatHistory({
        ...chatHistory,
        version: 6,
        verbosity: 'medium',
        reasoningEffort: 'low',
      });
    case 6:
      const { aiModel, temperature, maxTokens, iconUrl, verbosity, reasoningEffort, ...rest } =
        chatHistory;
      return migrateChatHistory({
        ...rest,
        version: 7,
        assistantId: '',
      });
    case 7:
    default:
      return chatHistory;
  }
};

export const createNewChatHistory = (params: Omit<ChatHistory, 'version'>): ChatHistory => {
  return { version: 7, ...params };
};

export const fetchChatCompletion = async (params: {
  model: string;
  temperature: number;
  maxTokens: number;
  messages: ChatMessage[];
  systemPrompt?: string;
  providerType?: AiProviderType;
  verbosity?: VerbosityType;
  reasoningEffort?: ReasoningEffortType;
  webSearchEnabled?: boolean;
  promptId?: string;
}) => {
  const {
    model,
    temperature,
    maxTokens,
    messages,
    systemPrompt,
    providerType = 'openai',
    verbosity = 'medium',
    reasoningEffort = 'low',
    webSearchEnabled = false,
    promptId,
  } = params;

  isDev && console.group("🧠 openai's API call");
  isDev && console.time("openai's API call");

  // アダプタの生成
  const adapter = createEndpointAdapter(providerType);

  // リクエストパラメータの構築
  const request: ChatCompletionRequest = {
    model,
    temperature,
    maxTokens,
    messages,
    systemPrompt,
    verbosity,
    reasoningEffort,
    webSearchEnabled,
    promptId,
  };

  // リクエストペイロードの構築（アダプタに委譲）
  const payload = adapter.buildRequestPayload(request);

  isDev &&
    console.log('API Request', {
      endpoint: adapter.endpoint,
      providerType,
      payload,
    });

  // API呼び出し
  const response = await kintoneApiFetch(adapter.endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  !isProd && console.timeEnd("openai's API call");

  const apiResponse: any = await response.json();

  !isProd &&
    console.log('API Response', {
      responseBody: apiResponse,
      responseCode: response.status,
      responseHeader: response.headers,
    });

  // レスポンスのパース（アダプタに委譲）
  const result = await adapter.parseResponse(response, apiResponse);

  isDev &&
    console.log(`このやり取りで${apiResponse?.usage?.total_tokens ?? '不明'}トークン消費しました`);

  isDev && console.groupEnd();

  return result;
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
