import { OPENAI_ENDPOINT } from '@/lib/static';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from 'openai';
import { marked } from 'marked';

marked.use({ mangle: false, headerIds: false });

export const fetchChatCompletion = async (params: {
  pluginId: string;
  messages: ChatCompletionRequestMessage[];
}) => {
  const { messages, pluginId } = params;

  const requestBody: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: process.env.NODE_ENV === 'development' ? 512 : 2048,
    messages,
  };

  const [responseBody, responseCode, responseHeader] = await kintone.plugin.app.proxy(
    pluginId,
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
