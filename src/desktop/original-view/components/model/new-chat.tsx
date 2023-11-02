import { Button } from '@mui/material';
import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { loadingState, selectedHistoryIdState } from '@/desktop/original-view/states/states';

const Component: FC = () => {
  const loading = useRecoilValue(loadingState);

  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(selectedHistoryIdState, null);
      },
    []
  );

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
