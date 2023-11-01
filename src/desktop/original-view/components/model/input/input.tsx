import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { useChatHistory } from '@/desktop/original-view/hooks/use-chat-history';
import { inputTextState, pluginConfigState } from '@/desktop/original-view/states/states';
import { TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const config = useRecoilValue(pluginConfigState);
  const input = useRecoilValue(inputTextState);
  const { enablesEnter, enablesShiftEnter } = config;
  const { sendMessage } = useMessageController();
  const { pushUserMessage } = useChatHistory();

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(inputTextState, event.target.value);
      },
    []
  );

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    const isEnter = event.key === 'Enter';
    const isShift = event.shiftKey;

    if ((enablesEnter && isEnter && !isShift) || (enablesShiftEnter && isEnter && isShift)) {
      event.preventDefault();
      await pushUserMessage();
      await sendMessage();
    }
  };

  return (
    <div>
      <TextField
        multiline
        sx={{ width: '100%' }}
        minRows={2}
        maxRows={10}
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
