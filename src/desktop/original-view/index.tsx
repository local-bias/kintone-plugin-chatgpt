import { URL_QUERY_CHAT_ID, VIEW_ROOT_ID } from '@/lib/static';
import { Root, createRoot } from 'react-dom/client';
import App from './app';
import React from 'react';
import { listener } from '@/lib/listener';
import { restorePluginConfig } from '@/lib/plugin';

let cachedRoot: Root | null = null;

listener.add(['app.record.index.show'], (event) => {
  const config = restorePluginConfig();
  if (!config || config?.viewId !== String(event.viewId)) {
    return event;
  }

  if (!cachedRoot) {
    const rootElement = document.getElementById(VIEW_ROOT_ID);
    if (!rootElement) {
      return event;
    }
    cachedRoot = createRoot(rootElement);
  }

  // urlからchat_idを取得
  const url = new URL(location.href);
  const chatId = url.searchParams.get(URL_QUERY_CHAT_ID);

  cachedRoot.render(<App initChatId={chatId} />);

  return event;
});
