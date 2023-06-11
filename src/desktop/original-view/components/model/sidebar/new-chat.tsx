import { Button } from '@mui/material';
import React, { FCX } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilCallback } from 'recoil';
import { selectedHistoryIdState } from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(selectedHistoryIdState, null);
      },
    []
  );

  return (
    <div className={className}>
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

const StyledComponent = styled(Component)`
  padding: 16px;
`;

export default StyledComponent;
