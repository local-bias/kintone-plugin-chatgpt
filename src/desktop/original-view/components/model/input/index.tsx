import React, { FCX } from 'react';
import SendButton from './send-button';
import Input from './input';

const Component: FCX = () => (
  <div className='z-10 sticky bottom-0 left-0 w-full bg-gray-50'>
    <div className='flex flex-col py-2 px-4 gap-2 max-w-[900px] mx-auto'>
      <SendButton />
      <Input />
    </div>
  </div>
);

export default Component;
