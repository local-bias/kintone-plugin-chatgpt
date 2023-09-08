import { VIEW_ROOT_ID } from '@/lib/static';
import { KintoneEventListener, restoreStorage } from '@konomi-app/kintone-utilities';
import { createRoot } from 'react-dom/client';
import App from './app';
import React from 'react';
import { PLUGIN_ID } from '@/lib/global';

export default (listener: KintoneEventListener) => {
  listener.add(['app.record.index.show'], (event) => {
    const config = restoreStorage<kintone.plugin.Storage>(PLUGIN_ID);
    if (!config || config?.viewId !== String(event.viewId)) {
      return event;
    }
    const rootElement = document.getElementById(VIEW_ROOT_ID);
    if (!rootElement) {
      return event;
    }
    const root = createRoot(rootElement);
    root.render(<App />);

    return event;
  });
};
