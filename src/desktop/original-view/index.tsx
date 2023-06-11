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
    const storage = restoreStorage<kintone.plugin.Storage>(pluginId);
    if (!storage) {
      return event;
    }
    const found = storage.conditions.find((condition) => condition.viewId === String(event.viewId));
    if (!found) {
      return event;
    }
    const rootElement = document.getElementById(VIEW_ROOT_ID);
    if (!rootElement) {
      return event;
    }
    const root = createRoot(rootElement);
    root.render(<App condition={found} />);

    return event;
  });
};
