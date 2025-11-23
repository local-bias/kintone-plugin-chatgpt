import { listener } from '@/lib/listener';
import { URL_QUERY_CHAT_ID, VIEW_ROOT_ID } from '@/lib/static';
import { store } from '@/lib/store';
import { ComponentManager } from '@konomi-app/kintone-utilities-react';
import { nanoid } from 'nanoid';
import { pluginConfigAtom } from '../public-state';
import { initializeRecords } from './actions/initialize-records';
import App from './app';
import { handleHistoryIdSelectAtom } from './states/states';

const ROOT_ID = nanoid();

listener.add(['app.record.index.show'], (event) => {
  const config = store.get(pluginConfigAtom);
  if (config.common.viewId !== String(event.viewId)) {
    return event;
  }

  initializeRecords();

  // urlからchat_idを取得
  const url = new URL(location.href);
  const chatId = url.searchParams.get(URL_QUERY_CHAT_ID);
  if (chatId) {
    store.set(handleHistoryIdSelectAtom, chatId);
  }

  const componentManager = ComponentManager.getInstance();

  componentManager.renderComponent({
    id: ROOT_ID,
    component: <App />,
    parentElement: document.getElementById(VIEW_ROOT_ID) ?? undefined,
  });

  return event;
});
