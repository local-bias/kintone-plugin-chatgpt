import { allowWebSearchAtom, webSearchEnabledAtom } from '@/desktop/original-view/states/states';
import { Switch } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';

export default function WebSearchToggle() {
  const allowWebSearch = useAtomValue(allowWebSearchAtom);
  const [enabled, setEnabled] = useAtom(webSearchEnabledAtom);

  if (!allowWebSearch) {
    return null;
  }

  return (
    <div className='rad:flex rad:flex-wrap rad:items-center rad:gap-1 rad:text-sm rad:text-gray-600'>
      <div className='rad:text-xs'>最新の情報に基づいて回答する</div>
      <Switch size='small' checked={enabled} onChange={() => setEnabled((prev) => !prev)} />
    </div>
  );
}
