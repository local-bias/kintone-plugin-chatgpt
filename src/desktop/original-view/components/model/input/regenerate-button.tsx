import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import {
  selectedHistoryState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import { Button } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const { sendMessage } = useMessageController();
  const waitingForResponse = useRecoilValue(waitingForResponseState);

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(selectedHistoryState, (p, prev = p!) => {
          if (prev.messages[prev.messages.length - 1].role !== 'assistant') {
            return prev;
          }
          return { ...prev, messages: prev.messages.slice(0, prev.messages.length - 1) };
        });
        await sendMessage();
      },
    []
  );

  return (
    <Button variant='outlined' color='info' onClick={onClick} disabled={waitingForResponse}>
      再生成
    </Button>
  );
};

const Container: FC = () => {
  const selectedHistory = useRecoilValue(selectedHistoryState);

  if (!selectedHistory) {
    return null;
  }
  return <Component />;
};

export default memo(Container);
