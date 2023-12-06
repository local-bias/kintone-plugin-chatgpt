import { OpenAI } from 'openai';
import React, { FC, PropsWithChildren } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AiIcon from './ai-icon';

type Props = { role: OpenAI.Chat.ChatCompletionRole };

const Component: FC<PropsWithChildren<Props>> = ({ children, role }) => (
  <div className='max-w-content mx-auto py-6 px-4 grid grid-cols-message gap-6 relative'>
    <div
      data-role={role}
      className="overflow-hidden h-[30px] grid place-items-center rounded text-white data-[role='user']:bg-blue-600 [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
    >
      {role === 'assistant' && <AiIcon />}
      {role === 'user' && <PersonIcon />}
    </div>
    <div className='overflow-x-auto'>{children}</div>
  </div>
);

export default Component;
