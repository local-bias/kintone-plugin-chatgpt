import React, { FC } from 'react';
import NewChatButton from '../new-chat';
import Histories from './histories';
import { Drawer, Fab } from '@mui/material';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  isHistoryDrawerOpenState,
  isHistoryFabShownState,
} from '@/desktop/original-view/states/states';
import Pagination from './pagination';
import { cn } from '@/lib/utils';
import { isMobile } from '@konomi-app/kintone-utilities';

const Component: FC = () => {
  const isHistoryFabShown = useRecoilValue(isHistoryFabShownState);
  const isHistoryDrawerOpen = useRecoilValue(isHistoryDrawerOpenState);

  const onIconClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(isHistoryDrawerOpenState, (prev) => !prev);
      },
    []
  );

  const onClose = useRecoilCallback(
    ({ set }) =>
      () => {
        set(isHistoryDrawerOpenState, false);
      },
    []
  );

  return (
    <>
      <div
        className={cn('fixed left-8 z-50', {
          '-top-2 left-[calc(50%-50dvw-8px)]': isMobile(),
          'bottom-8': !isMobile(),
        })}
      >
        {isHistoryFabShown && (
          <Fab onClick={onIconClick} color='primary'>
            <ViewHeadlineIcon />
          </Fab>
        )}
      </div>
      <Drawer anchor='left' open={isHistoryDrawerOpen} onClose={onClose} className='🐸'>
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
