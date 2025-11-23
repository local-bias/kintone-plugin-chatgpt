import { Fab } from '@mui/material';
import { useAtomValue } from 'jotai';
import { Bug } from 'lucide-react';
import { useState } from 'react';
import {
  selectedHistoryAtom,
  selectedHistoryIdAtom,
  selectedPluginConditionAtom,
  selectedPluginConditionIdAtom,
} from '../../states/states';

function JsonViewer({ data }: { data: any }) {
  return (
    <pre className='rad:max-h-[200px] rad:text-sm rad:font-mono rad:bg-gray-100 rad:p-2 rad:rounded rad:text-sm rad:whitespace-pre-wrap rad:overflow-x-auto'>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function DebugContent() {
  const conditionId = useAtomValue(selectedPluginConditionIdAtom);
  const condition = useAtomValue(selectedPluginConditionAtom);
  const historyId = useAtomValue(selectedHistoryIdAtom);
  const history = useAtomValue(selectedHistoryAtom);
  return (
    <div className='rad:max-w-[30svw] rad:max-h-[70svh] rad:overflow-auto'>
      <div className='rad:font-bold rad:mb-2'>Debug Info</div>
      <div className='rad:mb-1'>
        <span className='rad:text-xs'>Selected Condition ID:</span> {conditionId}
      </div>
      <details className='rad:bg-muted/50'>
        <summary>{condition.id}</summary>
        <JsonViewer data={condition} />
      </details>
      <div className='rad:mt-2 rad:mb-1'>
        <span className='rad:text-xs'>Selected History ID:</span> {historyId}
      </div>
      <details className='rad:bg-muted/50'>
        <summary>{history?.id || 'no history selected'}</summary>
        <JsonViewer data={history} />
      </details>
    </div>
  );
}

export function DebugStates() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='rad:grid rad:w-[30svw] rad:gap-4 rad:font-mono rad:text-sm rad:fixed rad:right-4 rad:bottom-4 rad:z-50'>
      {isOpen && (
        <div className='rad:mt-2 rad:bg-white rad:p-4 rad:rounded rad:shadow-lg'>
          <DebugContent />
        </div>
      )}
      <Fab
        size='small'
        className='rad:justify-self-end'
        color={isOpen ? 'primary' : 'inherit'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bug className='rad:h-4 rad:w-4' />
      </Fab>
    </div>
  );
}
