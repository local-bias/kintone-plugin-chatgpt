import { loadingAtom, selectedHistoryIdAtom } from '@/desktop/original-view/states/states';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { FC } from 'react';

const Component: FC = () => {
  const loading = useAtomValue(loadingAtom);
  const setHistoryId = useSetAtom(selectedHistoryIdAtom);

  const onClick = () => {
    setHistoryId(null);
  };

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
};

export default Component;
