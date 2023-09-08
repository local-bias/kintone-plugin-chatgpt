import { inputTextState } from '@/desktop/original-view/states/states';
import { TextField } from '@mui/material';
import React, { ChangeEventHandler, FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const input = useRecoilValue(inputTextState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(inputTextState, event.target.value);
      },
    []
  );

  return (
    <div>
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

export default Component;
