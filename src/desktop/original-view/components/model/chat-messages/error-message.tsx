import React, { FC, PropsWithChildren } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RegenerateButton from '../input/regenerate-button';

const Component: FC<PropsWithChildren> = ({ children }) => (
  <div className='bg-red-50 py-6 px-4'>
    <div className='max-w-content mx-auto grid grid-cols-message gap-6'>
      <div className='icon h-[30px] grid place-items-center rounded bg-red-500 text-white'>
        <ErrorOutlineIcon />
      </div>
      <div className='content'>
        <div>{children}</div>
        <div className='mt-8'>
          <RegenerateButton />
        </div>
      </div>
    </div>
  </div>
);

export default Component;
