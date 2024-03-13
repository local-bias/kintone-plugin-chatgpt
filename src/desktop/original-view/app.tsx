import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import Sidebar from './components/model/sidebar';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import ChatHistoryRecordsObserver from './components/functional/chat-history-records-observer';
import { SnackbarProvider } from 'notistack';
import Layout from './components/layout';
import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { selectedHistoryIdState } from './states/states';

type Props = { initChatId: string | null };

const Component: FC<Props> = ({ initChatId }) => (
  <PluginErrorBoundary>
    <RecoilRoot
      initializeState={({ set }) => {
        set(selectedHistoryIdState, initChatId);
      }}
    >
      <SnackbarProvider maxSnack={1}>
        <ChatHistoryRecordsObserver />
        <Layout>
          <div className='bg-white min-h-[calc(100vh_-_200px)]'>
            <Sidebar />
            <PluginErrorBoundary>
              <div className='relative'>
                <ChatMessages />
                <Input />
              </div>
            </PluginErrorBoundary>
          </div>
        </Layout>
      </SnackbarProvider>
    </RecoilRoot>
  </PluginErrorBoundary>
);

export default Component;
