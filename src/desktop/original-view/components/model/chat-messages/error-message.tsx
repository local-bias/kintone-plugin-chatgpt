import styled from '@emotion/styled';
import React, { FCX, PropsWithChildren } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Component: FCX<PropsWithChildren> = ({ className, children }) => (
  <div className={className}>
    <div className='icon'>
      <ErrorOutlineIcon />
    </div>
    <div className='content'>{children}</div>
  </div>
);

const StyledComponent = styled(Component)`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 1.5em;

  .icon {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: #f44336;
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
