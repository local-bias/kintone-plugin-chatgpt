import { inputFilesState } from '@/desktop/original-view/states/states';
import { Chip } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const files = useRecoilValue(inputFilesState);

  const onFileDelete = useRecoilCallback(
    ({ set }) =>
      (index: number) => {
        set(inputFilesState, (files) => files.filter((_, i) => i !== index));
      },
    []
  );

  if (!files.length) {
    return null;
  }

  return (
    <div className='p-2 flex flex-wrap gap-2'>
      {files.map((file, i) => (
        <Chip key={i} label={file.name} onDelete={() => onFileDelete(i)} />
      ))}
    </div>
  );
};

export default Component;
