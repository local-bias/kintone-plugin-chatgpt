import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { URL_BANNER, URL_PROMOTION } from '@/lib/static';
import Footer from './components/model/footer';
import Form from './components/model/form';
import {
  PluginBanner,
  PluginContent,
  PluginLayout,
  Notification,
  PluginConfigProvider,
} from '@konomi-app/kintone-utilities-react';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import Sidebar from './components/model/sidebar';
import config from '../../plugin.config.mjs';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <RecoilRoot>
      <PluginErrorBoundary>
        <PluginConfigProvider config={config}>
          <Notification />
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <PluginLayout>
                <Sidebar />
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
    </RecoilRoot>
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Component;
