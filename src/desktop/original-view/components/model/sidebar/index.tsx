import React, { FC } from 'react';
import NewChatButton from '../new-chat';
import Histories from './histories';
import { Drawer, Fab } from '@mui/material';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { useRecoilValue } from 'recoil';
import { isHistoryFabShownState } from '@/desktop/original-view/states/states';
import Pagination from './pagination';

const Component: FC = () => {
  const isHistoryFabShown = useRecoilValue(isHistoryFabShownState);
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
        {isHistoryFabShown && (
          <Fab onClick={onIconClick} color='primary'>
            <ViewHeadlineIcon />
          </Fab>
        )}
      </div>
      <Drawer anchor='left' open={open} onClose={onClose} className='🐸'>
        <div className='w-[400px] max-w-[80vw] grid grid-rows-[auto_1fr] h-screen'>
          <div className='p-4'>
            <NewChatButton />
          </div>
          <Histories />
          <Pagination />
        </div>
      </Drawer>
    </>
  );
};

export default Component;
