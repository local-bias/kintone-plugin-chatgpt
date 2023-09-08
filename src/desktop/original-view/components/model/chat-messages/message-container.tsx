import styled from '@emotion/styled';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import React, { FCX, PropsWithChildren } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AiIcon from './ai-icon';

type Props = { role: ChatCompletionRequestMessageRoleEnum };

const Component: FCX<PropsWithChildren<Props>> = ({ className, children, role }) => (
  <div className={className}>
    <div className={`icon ${role}`}>
      {role === 'assistant' && <AiIcon />}
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
  position: relative;

  .icon {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    color: #fff;
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
