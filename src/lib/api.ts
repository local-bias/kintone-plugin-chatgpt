import { isDev, PLUGIN_ID } from './global';

/**
 * kintoneのproxy APIを、fetch APIのように使えるようにする
 * @param args
 * @returns
 */
export const kintoneApiFetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
  const [input, options] = args;

  try {
    if (isDev) {
      console.group('☁ kintoneApiFetch');
    }
    const url = new URL(input instanceof Request ? input.url : input).toString();
    const method = options?.method?.toUpperCase() ?? 'GET';
    const headers = options?.headers ?? {};
    const body = options?.body ?? {};

    if (isDev) {
      console.log('☁ APIリクエスト', { url, method, headers, body });
    }

    const [responseBody, responseCode, responseHeader] = await kintone.plugin.app.proxy(
      PLUGIN_ID,
      url,
      method,
      headers,
      body
    );

    if (isDev) {
      console.log('☁ APIレスポンス', {
        responseBody,
        responseCode,
        responseHeader,
      });
    }

    return new Response(responseBody, {
      status: responseCode,
      headers: new Headers(responseHeader),
    });
  } catch (error) {
    console.error('☁ kintoneApiFetch - APIリクエスト失敗', {
      error,
      input,
      options,
    });
    throw error;
  } finally {
    if (isDev) {
      console.groupEnd();
    }
  }
};
