import {
  chatHistoriesPaginationIndexState,
  chatHistoriesPaginationMaxState,
} from '@/desktop/original-view/states/states';
import { Pagination } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const paginationIndex = useRecoilValue(chatHistoriesPaginationIndexState);
  const paginationMax = useRecoilValue(chatHistoriesPaginationMaxState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (_: any, index: number) => {
        set(chatHistoriesPaginationIndexState, index);
      },
    []
  );

  return (
    <div className='p-2'>
      <div className='w-full grid place-items-center'>
        <Pagination
          count={paginationMax}
          page={paginationIndex}
          color='primary'
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Component;
