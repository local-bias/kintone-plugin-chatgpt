import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import Sidebar from './components/model/sidebar';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import ChatHistoryRecordsObserver from './components/functional/chat-history-records-observer';
import { SnackbarProvider } from 'notistack';
import Layout from './components/layout';

const Component: FC = () => (
  <RecoilRoot>
    <SnackbarProvider maxSnack={1}>
      <ChatHistoryRecordsObserver />
      <Layout>
        <div className='bg-gray-white min-h-[calc(100vh_-_200px)]'>
          <Sidebar />
          <div className='relative'>
            <ChatMessages />
            <Input />
          </div>
        </div>
      </Layout>
    </SnackbarProvider>
  </RecoilRoot>
);

export default Component;
