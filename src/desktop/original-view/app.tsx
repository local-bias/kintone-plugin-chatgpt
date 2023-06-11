import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { pluginConditionState } from './states/states';
import Layout from './components/layout';
import Contents from './components/layout/contents';
import Sidebar from './components/model/sidebar';
import ChatMessages from './components/model/chat-messages';
import Input from './components/model/input';
import ChatHistoryRecordsObserver from './components/functional/chat-history-records-observer';

type Props = { condition: kintone.plugin.Condition };

const Component: FC<Props> = ({ condition }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
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
