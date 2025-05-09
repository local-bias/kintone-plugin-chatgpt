import { inputFilesAtom, selectedPluginConditionAtom } from '@/desktop/original-view/states/states';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { ChangeEventHandler, FC } from 'react';

const Component: FC = () => {
  const setFiles = useSetAtom(inputFilesAtom);

  const onFileAdd: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFiles(Array.from(event.target.files ?? []));
  };

  return (
    <div className='p-2 h-full sticky top-0'>
      <label
        title='画像を追加'
        htmlFor='file-input'
        className='flex p-2 rounded-full border border-solid border-gray-300 cursor-pointer transition-all hover:bg-gray-100 hover:text-blue-500'
      >
        <PhotoIcon className='w-6 h-6' />
        <input
          id='file-input'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={onFileAdd}
        />
      </label>
    </div>
  );
};

const Container: FC = () => {
  const condition = useAtomValue(selectedPluginConditionAtom);
  if (!condition.allowImageUpload) {
    return null;
  }
  return <Component />;
};

export default Container;
