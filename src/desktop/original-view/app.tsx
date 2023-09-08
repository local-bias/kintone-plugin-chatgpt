import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { pluginConfigState } from './states/states';
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
      <div className='bg-gray-50 min-h-[calc(100vh_-_300px)] flex'>
        <Sidebar />
        <div className='flex-1 relative'>
          <ChatMessages />
          <Input />
        </div>
      </div>
    </SnackbarProvider>
  </RecoilRoot>
);

export default Component;
