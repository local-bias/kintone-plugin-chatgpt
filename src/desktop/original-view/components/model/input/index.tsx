import React, { FC } from 'react';
import SendButton from './send-button';
import Input from './input';
import NewChatButton from '../new-chat';
import SendingOption from './sending-option';

const Component: FC = () => (
  <div className='z-10 sticky bottom-0 left-0 w-full bg-gray-50'>
    <div className='flex flex-col py-2 px-4 gap-3 max-w-[900px] mx-auto'>
      <div className='flex justify-end items-end gap-8'>
        <div className='hidden md:block text-xs text-gray-500'>
          <SendingOption />
        </div>
        <div>
          <NewChatButton />
        </div>
        <div>
          <SendButton />
        </div>
      </div>
      <Input />
    </div>
  </div>
);

export default Component;
