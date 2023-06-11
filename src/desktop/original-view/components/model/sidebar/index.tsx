import styled from '@emotion/styled';
import React, { FC, FCX, PropsWithChildren } from 'react';
import NewChatButton from './new-chat';
import Histories from './histories';

const Wrapper: FCX<PropsWithChildren> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const StyledWrapper = styled(Wrapper)`
  flex-basis: 260px;
  position: sticky;
  top: 48px;
  max-height: calc(100vh - 48px);
  background-color: rgb(241, 245, 249);
`;

const Component: FCX = ({ className }) => (
  <StyledWrapper>
    <div className={className}>
      <NewChatButton />
      <Histories />
    </div>
  </StyledWrapper>
);

const StyledComponent = styled(Component)``;

export default StyledComponent;
