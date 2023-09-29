import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { inputTextState, pluginConfigState } from '@/desktop/original-view/states/states';
import { TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const config = useRecoilValue(pluginConfigState);
  const input = useRecoilValue(inputTextState);
  const { enablesEnter, enablesShiftEnter } = config;
  const { sendMessage } = useMessageController();

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(inputTextState, event.target.value);
      },
    []
  );

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (enablesEnter && event.key === 'Enter' && !event.shiftKey) {
      sendMessage();
    }
    if (enablesShiftEnter && event.key === 'Enter' && event.shiftKey) {
      sendMessage();
    }
  };

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
        onKeyDown={onKeyDown}
        placeholder='ここにメッセージを入力'
      />
    </div>
  );
};

export default Component;
