import { OPENAI_ENDPOINT } from '@/lib/static';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from 'openai';
import { marked } from 'marked';

export const fetchChatCompletion = async (params: {
  messages: ChatCompletionRequestMessage[];
  apiKey: string;
}) => {
  const { messages, apiKey } = params;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const requestBody: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: process.env.NODE_ENV === 'development' ? 512 : 2048,
    messages,
  };

  const [responseBody, responseCode, responseHeader] = await kintone.proxy(
    OPENAI_ENDPOINT,
    'POST',
    headers,
    requestBody
  );

  const completionResponse: CreateChatCompletionResponse = JSON.parse(responseBody);
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
