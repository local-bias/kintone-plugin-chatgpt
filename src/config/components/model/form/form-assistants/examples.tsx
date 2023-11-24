import { assistantExamplesState } from '@/config/states/plugin';
import { IconButton, TextField, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

const Component: FC = () => {
  const examples = useRecoilValue(assistantExamplesState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        set(assistantExamplesState, (prev) =>
          produce(prev, (draft) => {
            draft[index] = event.target.value;
          })
        );
      },
    []
  );

  const addRow = useRecoilCallback(
    ({ set }) =>
      async (index: number) => {
        set(assistantExamplesState, (prev) =>
          produce(prev, (draft) => {
            draft.splice(index + 1, 0, '');
          })
        );
      },
    []
  );

  const deleteRow = useRecoilCallback(
    ({ set }) =>
      async (index: number) => {
        set(assistantExamplesState, (prev) =>
          produce(prev, (draft) => {
            draft.splice(index, 1);
          })
        );
      },
    []
  );

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
