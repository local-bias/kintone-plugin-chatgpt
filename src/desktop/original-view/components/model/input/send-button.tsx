import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { useChatHistory } from '@/desktop/original-view/hooks/use-chat-history';
import { inputFilesAtom, inputTextAtom, loadingAtom } from '@/desktop/original-view/states/states';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { useAtomValue } from 'jotai';
import React, { FC, useCallback } from 'react';

const Component: FC = () => {
  const input = useAtomValue(inputTextAtom);
  const files = useAtomValue(inputFilesAtom);
  const loading = useAtomValue(loadingAtom);
  const { sendMessage } = useMessageController();
  const { pushUserMessage } = useChatHistory();

  const onClick = useCallback(async () => {
    await pushUserMessage();
    await sendMessage();
  }, []);

  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<SendIcon />}
      disabled={loading || (input === '' && files.length === 0)}
      onClick={onClick}
    >
      送信
    </Button>
  );
};

export default Component;
