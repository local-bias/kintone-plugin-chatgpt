import {
  isHistoryDrawerOpenAtom,
  isHistoryFabShownAtom,
} from '@/desktop/original-view/states/states';
import { cn } from '@/lib/utils';
import { isMobile } from '@konomi-app/kintone-utilities';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Drawer, Fab } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import NewChatButton from '../new-chat';
import Histories from './histories';
import Pagination from './pagination';

export default function Sidebar() {
  const isHistoryFabShown = useAtomValue(isHistoryFabShownAtom);
  const [isHistoryDrawerOpen, setHistoryDrawerOpen] = useAtom(isHistoryDrawerOpenAtom);

  const onIconClick = () => setHistoryDrawerOpen((p) => !p);

  const onClose = () => setHistoryDrawerOpen(false);

  return (
    <>
      <div
        className={cn('rad:fixed rad:left-8 rad:z-50', {
          'rad:-top-2 rad:left-[calc(50%-50dvw-8px)]': isMobile(),
          'rad:bottom-8': !isMobile(),
        })}
      >
        {isHistoryFabShown && (
          <Fab onClick={onIconClick} color='primary'>
            <ViewHeadlineIcon />
          </Fab>
        )}
      </div>
      <Drawer anchor='left' open={isHistoryDrawerOpen} onClose={onClose} className='🐸'>
        <div className='rad:w-[400px] rad:max-w-[80vw] rad:grid rad:grid-rows-[auto_1fr] rad:h-screen'>
          <div className='rad:p-4!'>
            <NewChatButton />
          </div>
          <Histories />
          <Pagination />
        </div>
      </Drawer>
    </>
  );
}
