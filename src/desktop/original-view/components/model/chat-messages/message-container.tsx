import styled from '@emotion/styled';
import { OpenAI } from 'openai';
import React, { FCX, PropsWithChildren } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AiIcon from './ai-icon';

type Props = { role: OpenAI.Chat.ChatCompletionMessage['role'] };

const Component: FCX<PropsWithChildren<Props>> = ({ className, children, role }) => (
  <div
    className={`${className} max-w-content mx-auto py-6 px-4 grid grid-cols-message gap-6 relative`}
  >
    <div className={`icon h-[30px] grid place-items-center rounded text-white ${role}`}>
      {role === 'assistant' && <AiIcon />}
      {role === 'user' && <PersonIcon />}
    </div>
    <div className='content'>{children}</div>
  </div>
);

const StyledComponent = styled(Component)`
  .icon {
    overflow: hidden;

    &.user {
      background-color: #0284c7;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    > div {
      > *:nth-of-type(1) {
        margin-top: 0;
      }
      > *:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export default StyledComponent;
