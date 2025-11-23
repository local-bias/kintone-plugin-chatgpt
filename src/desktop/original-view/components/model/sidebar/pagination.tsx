import {
  chatHistoriesPaginationIndexAtom,
  chatHistoriesPaginationMaxAtom,
} from '@/desktop/original-view/states/states';
import { Pagination } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React, { FC } from 'react';

export default function HistoryPagination() {
  const [paginationIndex, setPaginationIndex] = useAtom(chatHistoriesPaginationIndexAtom);
  const paginationMax = useAtomValue(chatHistoriesPaginationMaxAtom);

  const onChange = (_: unknown, index: number) => {
    setPaginationIndex(index);
  };

  return (
    <div className='rad:p-2!'>
      <div className='rad:w-full rad:grid rad:place-items-center'>
        <Pagination
          count={paginationMax}
          page={paginationIndex}
          color='primary'
          onChange={onChange}
        />
      </div>
    </div>
  );
}
