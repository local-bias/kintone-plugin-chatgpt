import {
  createNewChatHistory,
  fetchChatCompletion,
  logChatCompletion,
} from '@/desktop/original-view/action';
import { useMessageController } from '@/desktop/original-view/hooks/message-controller';
import {
  apiErrorMessageState,
  chatHistoriesState,
  inputTextState,
  pluginConfigState,
  selectedAssistantIndexState,
  selectedHistoryIdState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

const Component: FC = () => {
  const input = useRecoilValue(inputTextState);
  const waitingForResponse = useRecoilValue(waitingForResponseState);
  const { sendMessage } = useMessageController();

  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<SendIcon />}
      disabled={waitingForResponse || input === ''}
      onClick={sendMessage}
    >
      送信
    </Button>
  );
};

export default Component;
