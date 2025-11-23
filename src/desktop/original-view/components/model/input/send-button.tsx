import { handleSendMessageAtom } from '@/desktop/original-view/states/chat-message';
import { handlePushUserMessageAtom } from '@/desktop/original-view/states/chat-history';
import { isSendButtonDisabledAtom } from '@/desktop/original-view/states/states';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const handleButtonClickAtom = atom(null, async (_, set) => {
  await set(handlePushUserMessageAtom);
  await set(handleSendMessageAtom);
});

export default function SendButton() {
  const disabled = useAtomValue(isSendButtonDisabledAtom);
  const onClick = useSetAtom(handleButtonClickAtom);

  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<SendIcon />}
      disabled={disabled}
      onClick={onClick}
    >
      送信
    </Button>
  );
}
