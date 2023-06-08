import { outputAppUserSelectPropertiesState } from '@/config/states/kintone';
import { outputUserFieldCodeState } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { AutocompleteKintoneField } from './autocomplete-field-input';

const Component: FCX = () => {
  const fields = useRecoilValue(outputAppUserSelectPropertiesState);
  const fieldCode = useRecoilValue(outputUserFieldCodeState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(outputUserFieldCodeState, value);
      },
    []
  );

  return (
    <AutocompleteKintoneField fields={fields} fieldCode={fieldCode} onChange={onFieldChange} />
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton width={350} height={56} />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
