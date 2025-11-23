import { inputFilesAtom, selectedPluginConditionAtom } from '@/desktop/original-view/states/states';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChangeEventHandler } from 'react';

function FileInputComponent() {
  const setFiles = useSetAtom(inputFilesAtom);

  const onFileAdd: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFiles(Array.from(event.target.files ?? []));
  };

  return (
    <div className='rad:p-2! rad:h-full rad:sticky rad:top-0'>
      <label
        title='画像を追加'
        htmlFor='file-input'
        className='rad:flex rad:p-2! rad:rounded-full rad:border! rad:border-solid rad:border-input rad:cursor-pointer rad:transition-all rad:hover:bg-gray-100 rad:hover:text-blue-500'
      >
        <PhotoIcon className='rad:w-6 rad:h-6' />
        <input
          id='file-input'
          type='file'
          accept='image/*'
          className='rad:hidden'
          onChange={onFileAdd}
        />
      </label>
    </div>
  );
}

export default function FileInput() {
  const condition = useAtomValue(selectedPluginConditionAtom);
  if (!condition.allowImageUpload) {
    return null;
  }
  return <FileInputComponent />;
}
