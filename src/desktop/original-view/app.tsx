import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { pluginConfigState } from './states/states';
import Layout from './components/layout';
import Contents from './components/layout/contents';
import Sidebar from './components/model/sidebar';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import ChatHistoryRecordsObserver from './components/functional/chat-history-records-observer';
import { SnackbarProvider } from 'notistack';

type Props = { config: kintone.plugin.Storage };

const Component: FC<Props> = ({ config }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConfigState, config);
    }}
  >
    <SnackbarProvider maxSnack={1}>
      <ChatHistoryRecordsObserver />
      <Layout>
        <Sidebar />
        <Contents>
          <ChatMessages />
          <Input />
        </Contents>
      </Layout>
    </SnackbarProvider>
  </RecoilRoot>
);

export default Component;
