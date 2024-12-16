import {
  isHistoryDrawerOpenAtom,
  isHistoryFabShownAtom,
} from '@/desktop/original-view/states/states';
import { cn } from '@/lib/utils';
import { isMobile } from '@konomi-app/kintone-utilities';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Drawer, Fab } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React, { FC } from 'react';
import NewChatButton from '../new-chat';
import Histories from './histories';
import Pagination from './pagination';

const Component: FC = () => {
  const isHistoryFabShown = useAtomValue(isHistoryFabShownAtom);
  const [isHistoryDrawerOpen, setHistoryDrawerOpen] = useAtom(isHistoryDrawerOpenAtom);

  const onIconClick = () => setHistoryDrawerOpen((p) => !p);

  const onClose = () => setHistoryDrawerOpen(false);

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
