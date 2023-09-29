import { listener } from '@/lib/listener';
import { restorePluginConfig } from '@/lib/plugin';
import { css } from '@emotion/css';

listener.add(['app.record.index.show'], (event) => {
  const config = restorePluginConfig();
  const { viewId } = config;

  if (event.viewId !== Number(viewId)) {
    return event;
  }

  document.body.classList.add(css`
    .gaia-mobile-v2-viewpanel-footer,
    .goog-tab {
      display: none !important;
      z-index: -1 !important;
    }
  `);

  return event;
});
