import { handleSendMessageAtom } from '@/desktop/original-view/states/chat-message';
import {
  isChatHistorySelectedAtom,
  loadingAtom,
  selectedHistoryAtom,
} from '@/desktop/original-view/states/states';
import { Button } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { RotateCw } from 'lucide-react';

const handleClickAtom = atom(null, async (get, set) => {
  const current = get(selectedHistoryAtom);
  if (!current) {
    return;
  }
  const lastMessage = current.messages[current.messages.length - 1];
  if (lastMessage?.role === 'assistant') {
    const newValue = {
      ...current,
      messages: current.messages.slice(0, current.messages.length - 1),
    };
    set(selectedHistoryAtom, newValue);
  }
  await set(handleSendMessageAtom);
});

function RegenerateButtonComponent() {
  const loading = useAtomValue(loadingAtom);
  const onClick = useSetAtom(handleClickAtom);

  return (
    <Button
      variant='outlined'
      color='info'
      onClick={onClick}
      disabled={loading}
      startIcon={<RotateCw className='rad:w-4 rad:h-4' />}
    >
      再生成
    </Button>
  );
}

export default function RegenerateButton() {
  const selected = useAtomValue(isChatHistorySelectedAtom);
  if (!selected) {
    return null;
  }
  return <RegenerateButtonComponent />;
}
