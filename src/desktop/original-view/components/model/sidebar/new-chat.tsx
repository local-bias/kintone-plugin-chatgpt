import { Button } from '@mui/material';
import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

const Component: FC = () => (
  <div>
    <Button variant='outlined' color='primary' startIcon={<AddIcon />}>
      新しいチャット
    </Button>
  </div>
);

export default Component;
