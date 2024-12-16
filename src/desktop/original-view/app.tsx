import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { store } from '@/lib/store';
import { Provider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import Layout from './components/layout';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import Sidebar from './components/model/sidebar';

const Component: FC = () => {
  return (
    <>
      <Sidebar />
      <PluginErrorBoundary>
        <div className='relative'>
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
          <div className='bg-white min-h-[calc(100vh_-_200px)]'>
            <Component />
          </div>
        </Layout>
      </SnackbarProvider>
    </PluginErrorBoundary>
  </Provider>
);

export default Container;
