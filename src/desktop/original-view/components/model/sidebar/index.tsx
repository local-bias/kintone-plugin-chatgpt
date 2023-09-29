import React, { FC } from 'react';
import NewChatButton from '../new-chat';
import Histories from './histories';
import { Drawer, Fab, IconButton } from '@mui/material';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const Component: FC = () => {
  const [open, setOpen] = React.useState(false);

  const onIconClick = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='fixed left-8 bottom-8 z-50'>
        <Fab onClick={onIconClick} color='primary'>
          <ViewHeadlineIcon />
        </Fab>
      </div>
      <Drawer anchor='left' open={open} onClose={onClose}>
        <div className='w-[400px] max-w-[80vw]'>
          <div className='p-4'>
            <NewChatButton />
          </div>
          <Histories />
        </div>
      </Drawer>
    </>
  );
};

export default Component;
