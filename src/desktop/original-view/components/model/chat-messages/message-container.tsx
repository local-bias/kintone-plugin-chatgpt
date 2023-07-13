import styled from '@emotion/styled';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import React, { FCX, PropsWithChildren } from 'react';
import { ChatGPTIcon } from '../../ui/chatgpt-icon';
import PersonIcon from '@mui/icons-material/Person';

type Props = { role: ChatCompletionRequestMessageRoleEnum };

const Component: FCX<PropsWithChildren<Props>> = ({ className, children, role }) => (
  <div className={className}>
    <div className='icon'>
      {role === 'assistant' && <ChatGPTIcon />}
      {role === 'user' && <PersonIcon />}
    </div>
    <div className='content'>{children}</div>
  </div>
);

const StyledComponent = styled(Component)`
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5em 1em;
  display: flex;
  gap: 1.5em;

  .icon {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: #0284c7;
    color: #fff;
  }

  .content {
    flex: 1;
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
