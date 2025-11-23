import { inputFilesAtom } from '@/desktop/original-view/states/states';
import { Chip } from '@mui/material';
import { useAtom } from 'jotai';

export default function InputFiles() {
  const [files, setFiles] = useAtom(inputFilesAtom);

  const onFileDelete = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  };

  if (!files.length) {
    return null;
  }

  return (
    <div className='rad:p-2! rad:flex rad:flex-wrap rad:gap-2'>
      {files.map((file, i) => (
        <Chip key={i} label={file.name} onDelete={() => onFileDelete(i)} />
      ))}
    </div>
  );
}
