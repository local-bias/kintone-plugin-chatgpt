import { VIEW_ROOT_ID } from '@/lib/static';
import { createRoot } from 'react-dom/client';
import App from './app';
import React from 'react';
import { listener } from '@/lib/listener';
import { restorePluginConfig } from '@/lib/plugin';

listener.add(['app.record.index.show'], (event) => {
  const config = restorePluginConfig();
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
