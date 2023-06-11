import styled from '@emotion/styled';
import React, { FCX } from 'react';
import Wrapper from './wrapper';
import SendButton from './send-button';
import Input from './input';

const Component: FCX = ({ className }) => (
  <Wrapper>
    <div className={className}>
      <SendButton />
      <Input />
    </div>
  </Wrapper>
);

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  gap: 8px;
  max-width: 900px;
  margin: 0 auto;
`;

export default StyledComponent;
