import React, { FCX } from 'react';
import NewChatButton from './new-chat';
import Histories from './histories';

const Component: FCX = ({ className }) => (
  <div className='basis-64 sticky top-12 max-h-[calc(100vh_-_48px)] bg-gray-100'>
    <div className={className}>
      <NewChatButton />
      <Histories />
    </div>
  </div>
);

export default Component;
