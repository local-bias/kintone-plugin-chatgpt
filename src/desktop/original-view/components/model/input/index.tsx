import React, { FC } from 'react';
import SendButton from './send-button';
import Input from './input';
import FileInput from './file-input';
import NewChatButton from '../new-chat';
import SendingOption from './sending-option';
import RegenerateButton from './regenerate-button';
import Examples from './examples';
import Files from './files';

const Component: FC = () => (
  <div className='z-10 sticky bottom-0 left-0 w-full bg-white'>
    <div className='flex flex-col py-2 px-4 gap-3 max-w-content mx-auto'>
      <Examples />
      <div className='flex justify-between items-end gap-8'>
        <div>
          <RegenerateButton />
        </div>
        <div className='flex items-end gap-8'>
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
      </div>
      <div className='relative max-h-60 overflow-auto border border-solid border-gray-300 rounded-md'>
        <div className='flex'>
          <Input />
          <FileInput />
        </div>
        <Files />
      </div>
    </div>
  </div>
);

export default Component;
