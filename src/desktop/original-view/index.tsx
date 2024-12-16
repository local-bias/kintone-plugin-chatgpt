import { listener } from '@/lib/listener';
import { restorePluginConfig } from '@/lib/plugin';
import { URL_QUERY_CHAT_ID, VIEW_ROOT_ID } from '@/lib/static';
import { store } from '@/lib/store';
import { ComponentManager } from '@konomi-app/kintone-utilities-react';
import React from 'react';
import { initializeRecords } from './actions/initialize-records';
import App from './app';
import { selectedHistoryIdAtom } from './states/states';

listener.add(['app.record.index.show'], (event) => {
  const config = restorePluginConfig();
  if (config.common.viewId !== String(event.viewId)) {
    return event;
  }

  initializeRecords();

  // urlからchat_idを取得
  const url = new URL(location.href);
  const chatId = url.searchParams.get(URL_QUERY_CHAT_ID);
  store.set(selectedHistoryIdAtom, chatId);

  const componentManager = ComponentManager.getInstance();

  componentManager.renderComponent({
    id: VIEW_ROOT_ID,
    component: <App />,
  });

  return event;
});
