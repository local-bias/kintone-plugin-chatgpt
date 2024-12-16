import { inputFilesAtom } from '@/desktop/original-view/states/states';
import { Chip } from '@mui/material';
import { useAtom } from 'jotai';
import React, { FC } from 'react';

const Component: FC = () => {
  const [files, setFiles] = useAtom(inputFilesAtom);

  const onFileDelete = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  };

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
