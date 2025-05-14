import { assistantExamplesAtom } from '@/config/states/plugin';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { produce } from 'immer';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent, FC } from 'react';

const handleExampleChangeAtom = atom(
  null,
  (_, set, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    set(assistantExamplesAtom, (prev) =>
      produce(prev, (draft) => {
        draft[index] = event.target.value;
      })
    );
  }
);

const handleExampleAddAtom = atom(null, (_, set, index: number) => {
  set(assistantExamplesAtom, (prev) =>
    produce(prev, (draft) => {
      draft.splice(index + 1, 0, '');
    })
  );
});

const handleExampleDeleteAtom = atom(null, (_, set, index: number) => {
  set(assistantExamplesAtom, (prev) =>
    produce(prev, (draft) => {
      draft.splice(index, 1);
    })
  );
});

const Component: FC = () => {
  const examples = useAtomValue(assistantExamplesAtom);
  const onChange = useSetAtom(handleExampleChangeAtom);
  const addRow = useSetAtom(handleExampleAddAtom);
  const deleteRow = useSetAtom(handleExampleDeleteAtom);

  return (
    <div className='flex flex-col gap-4'>
      {examples.map((ex, i) => (
        <div key={i} className='flex items-center gap-2'>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='例文'
            fullWidth
            value={ex}
            onChange={(e) => onChange(e, i)}
          />
          <Tooltip title='例文を追加'>
            <IconButton size='small' onClick={() => addRow(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {examples.length > 1 && (
            <Tooltip title='この例文を削除'>
              <IconButton size='small' onClick={() => deleteRow(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

export default Component;
