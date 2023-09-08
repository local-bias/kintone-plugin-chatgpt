import React, { FC } from 'react';
import NewChatButton from './new-chat';
import Histories from './histories';

const Component: FC = () => (
  <div className='basis-64 sticky top-12 max-h-[calc(100vh_-_48px)] bg-gray-100'>
    <div>
      <NewChatButton />
      <Histories />
    </div>
  </div>
);

export default Component;
