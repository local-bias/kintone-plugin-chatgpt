import { Button } from '@mui/material';
import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilCallback } from 'recoil';
import { selectedHistoryIdState } from '@/desktop/original-view/states/states';

const Component: FC = () => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(selectedHistoryIdState, null);
      },
    []
  );

  return (
    <div className='p-4'>
      <Button
        variant='outlined'
        color='primary'
        fullWidth
        startIcon={<AddIcon />}
        onClick={onClick}
      >
        新しいチャット
      </Button>
    </div>
  );
};

export default Component;
