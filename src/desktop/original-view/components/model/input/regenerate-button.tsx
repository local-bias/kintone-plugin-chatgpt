import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { loadingAtom, selectedHistoryAtom } from '@/desktop/original-view/states/states';
import { Button } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import React, { FC, memo, useCallback } from 'react';

const Component: FC = () => {
  const { sendMessage } = useMessageController();
  const loading = useAtomValue(loadingAtom);

  const onClick = useAtomCallback(
    useCallback(async (get, set) => {
      const current = get(selectedHistoryAtom);
      if (!current) {
        return;
      }
      if (current.messages[current.messages.length - 1].role !== 'assistant') {
        return;
      }
      const newValue = {
        ...current,
        messages: current.messages.slice(0, current.messages.length - 1),
      };
      set(selectedHistoryAtom, newValue);
      await sendMessage();
    }, [])
  );

  return (
    <Button variant='outlined' color='info' onClick={onClick} disabled={loading}>
      再生成
    </Button>
  );
};

const Container: FC = () => {
  const selectedHistory = useAtomValue(selectedHistoryAtom);

  if (!selectedHistory) {
    return null;
  }
  return <Component />;
};

export default memo(Container);
