import { inputTextState } from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FCX = ({ className }) => {
  const input = useRecoilValue(inputTextState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(inputTextState, event.target.value);
      },
    []
  );

  return (
    <div className={className}>
      <TextField
        multiline
        sx={{ width: '100%' }}
        rows={2}
        variant='outlined'
        label='送信メッセージ'
        value={input}
        onChange={onChange}
        placeholder='ここにメッセージを入力'
      />
    </div>
  );
};

const StyledComponent = styled(Component)``;

export default StyledComponent;
