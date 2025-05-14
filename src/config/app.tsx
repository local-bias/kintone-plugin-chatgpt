import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { URL_BANNER, URL_PROMOTION } from '@/lib/static';
import { store } from '@/lib/store';
import {
  Notification,
  PluginBanner,
  PluginConfigProvider,
  PluginContent,
  PluginLayout,
} from '@konomi-app/kintone-utilities-react';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { Provider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { FC, Suspense } from 'react';
import config from '../../plugin.config.mjs';
import Footer from './components/footer';
import Form from './components/model/form';
import Sidebar from './components/sidebar';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <Provider store={store}>
      <PluginErrorBoundary>
        <PluginConfigProvider config={config}>
          <Notification />
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <PluginLayout>
                <PluginErrorBoundary>
                  <Sidebar />
                </PluginErrorBoundary>
                <PluginContent>
                  <PluginErrorBoundary>
                    <Form />
                  </PluginErrorBoundary>
                </PluginContent>
                <PluginBanner url={URL_BANNER} />
                <Footer />
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginConfigProvider>
      </PluginErrorBoundary>
    </Provider>
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Component;
