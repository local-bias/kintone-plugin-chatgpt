import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { store } from '@/lib/store';
import { Provider, useAtom } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';
import { Debug } from './components/debug';
import Layout from './components/layout';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import Sidebar from './components/model/sidebar';
import { autoSelectAssistantEffect, urlSearchParamsEffect } from './states/states';

const Component: FC = () => {
  useAtom(urlSearchParamsEffect);
  useAtom(autoSelectAssistantEffect);
  return (
    <>
      <Sidebar />
      <PluginErrorBoundary>
        <div className='rad:relative'>
          <ChatMessages />
          <Input />
        </div>
      </PluginErrorBoundary>
    </>
  );
};

const Container: FC = () => (
  <Provider store={store}>
    <PluginErrorBoundary>
      <SnackbarProvider maxSnack={1}>
        <Layout className='🐸'>
          <div className='rad:bg-white rad:min-h-[calc(100vh_-_200px)]'>
            <Component />
          </div>
        </Layout>
        <Debug />
      </SnackbarProvider>
    </PluginErrorBoundary>
  </Provider>
);

export default Container;
