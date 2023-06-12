import { VIEW_ROOT_ID } from '@/lib/static';
import { KintoneEventListener, restoreStorage } from '@konomi-app/kintone-utilities';
import { createRoot } from 'react-dom/client';
import App from './app';
import React from 'react';

export default (listener: KintoneEventListener) => {
  listener.add(['app.record.index.show'], (event, { pluginId }) => {
    if (!pluginId) {
      return event;
    }
    const config = restoreStorage<kintone.plugin.Storage>(pluginId);
    if (!config || config?.viewId !== String(event.viewId)) {
      return event;
    }
    const rootElement = document.getElementById(VIEW_ROOT_ID);
    if (!rootElement) {
      return event;
    }
    const root = createRoot(rootElement);
    root.render(<App pluginId={pluginId} config={config} />);

    return event;
  });
};
