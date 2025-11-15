import { listener } from '@/lib/listener';
import { store } from '@/lib/store';
import { css } from '@emotion/css';
import { pluginConfigAtom } from '../public-state';

listener.add(['app.record.index.show'], (event) => {
  const config = store.get(pluginConfigAtom);
  const { viewId } = config.common;

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
