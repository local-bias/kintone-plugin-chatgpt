import { loadingAtom, selectedHistoryIdAtom } from '@/desktop/original-view/states/states';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const handleButtonClickAtom = atom(null, async (_, set) => {
  set(selectedHistoryIdAtom, null);
});

export default function NewChatButton() {
  const loading = useAtomValue(loadingAtom);
  const onClick = useSetAtom(handleButtonClickAtom);

  return (
    <Button
      variant='outlined'
      color='primary'
      fullWidth
      startIcon={<AddIcon />}
      onClick={onClick}
      disabled={loading}
    >
      新しいチャット
    </Button>
  );
}
