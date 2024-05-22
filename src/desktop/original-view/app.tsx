import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import Sidebar from './components/model/sidebar';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import { SnackbarProvider } from 'notistack';
import Layout from './components/layout';
import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { selectedHistoryIdState } from './states/states';
import { useInitializeRecords } from './hooks/use-initialize-records';

type Props = { initChatId: string | null };

const Component: FC = () => {
  useInitializeRecords();

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

const Container: FC<Props> = ({ initChatId }) => (
  <PluginErrorBoundary>
    <RecoilRoot
      initializeState={({ set }) => {
        set(selectedHistoryIdState, initChatId);
      }}
    >
      <SnackbarProvider maxSnack={1}>
        <Layout className='🐸'>
          <div className='bg-white min-h-[calc(100vh_-_200px)]'>
            <Component />
          </div>
        </Layout>
      </SnackbarProvider>
    </RecoilRoot>
  </PluginErrorBoundary>
);

export default Container;
