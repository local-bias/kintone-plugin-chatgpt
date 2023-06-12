import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { pluginConfigState, pluginIdState } from './states/states';
import Layout from './components/layout';
import Contents from './components/layout/contents';
import Sidebar from './components/model/sidebar';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import ChatHistoryRecordsObserver from './components/functional/chat-history-records-observer';

type Props = { pluginId: string; config: kintone.plugin.Storage };

const Component: FC<Props> = ({ pluginId, config }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginIdState, pluginId);
      set(pluginConfigState, config);
    }}
  >
    <ChatHistoryRecordsObserver />
    <Layout>
      <Sidebar />
      <Contents>
        <ChatMessages />
        <Input />
      </Contents>
    </Layout>
  </RecoilRoot>
);

export default Component;
