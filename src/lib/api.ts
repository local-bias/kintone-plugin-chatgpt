import { PLUGIN_ID } from './global';

/**
 * kintoneのproxy APIを、fetch APIのように使えるようにする
 * @param args
 * @returns
 */
export const kintoneApiFetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
  const [input, options] = args;

  const url = new URL(input instanceof Request ? input.url : input).toString();
  const method = options?.method?.toUpperCase() ?? 'GET';
  const headers = options?.headers ?? {};
  const body = options?.body ?? {};

  const [responseBody, responseCode, responseHeader] = await kintone.plugin.app.proxy(
    PLUGIN_ID,
    url,
    method,
    headers,
    body
  );

  return new Response(responseBody, {
    status: responseCode,
    headers: new Headers(responseHeader),
  });
};
