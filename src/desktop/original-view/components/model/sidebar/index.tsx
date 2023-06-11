import styled from '@emotion/styled';
import React, { FC, FCX } from 'react';
import NewChatButton from './new-chat';

const Component: FCX = ({ className }) => (
  <div className={className}>
    <NewChatButton />
  </div>
);

const StyledComponent = styled(Component)`
  flex-basis: 260px;
  background-color: rgb(241, 245, 249);
  position: sticky;
  top: 0;
  max-height: calc(100vh - 128px);
  padding: 16px;
`;

export default StyledComponent;
