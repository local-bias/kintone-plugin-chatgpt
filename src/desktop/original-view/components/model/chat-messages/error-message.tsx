import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { PropsWithChildren } from 'react';
import RegenerateButton from '../input/regenerate-button';

export default function ChatErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className='rad:bg-red-50 rad:py-6! rad:px-4!'>
      <div className='rad:max-w-[900px] rad:mx-auto! rad:grid rad:grid-cols-[30px_1fr] rad:gap-6'>
        <div className='icon rad:h-[30px] rad:grid rad:place-items-center rad:rounded rad:bg-red-500 rad:text-white'>
          <ErrorOutlineIcon />
        </div>
        <div className='content'>
          <div>{children}</div>
          <div className='rad:mt-8!'>
            <RegenerateButton />
          </div>
        </div>
      </div>
    </div>
  );
}
