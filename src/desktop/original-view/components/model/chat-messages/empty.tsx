import styled from '@emotion/styled';
import React, { FCX } from 'react';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const Component: FCX = ({ className }) => (
  <div className={className}>
    <ChatOutlinedIcon sx={{ fontSize: '10em' }} />
    <div>送信メッセージを入力し、「送信」ボタンを押してください。</div>
    <div>送信メッセージに対する返答がここに表示されます。</div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 2em 1em;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  color: #0004;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  height: 440px;
`;

export default StyledComponent;
