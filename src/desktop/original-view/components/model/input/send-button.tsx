import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import { useChatHistory } from '@/desktop/original-view/hooks/use-chat-history';
import {
  inputFilesState,
  inputTextState,
  loadingState,
} from '@/desktop/original-view/states/states';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

const Component: FC = () => {
  const input = useRecoilValue(inputTextState);
  const files = useRecoilValue(inputFilesState);
  const loading = useRecoilValue(loadingState);
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
