import { inputFilesState, selectedAssistantState } from '@/desktop/original-view/states/states';
import React, { ChangeEventHandler, FC } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { IMAGE_SUPPORTED_MODELS } from '@/lib/static';

const Component: FC = () => {
  const onFileAdd: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(inputFilesState, Array.from(event.target.files ?? []));
      },
    []
  );

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
  const assistant = useRecoilValue(selectedAssistantState);

  if (!IMAGE_SUPPORTED_MODELS.includes(assistant.aiModel)) {
    return null;
  }

  return <Component />;
};

export default Container;
