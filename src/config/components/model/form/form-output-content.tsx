import { outputAppTextPropertiesState } from '@/config/states/kintone';
import { outputContentFieldCodeState } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { AutocompleteKintoneField } from './autocomplete-field-input';

const Component: FC = () => {
  const fields = useRecoilValue(outputAppTextPropertiesState);
  const fieldCode = useRecoilValue(outputContentFieldCodeState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(outputContentFieldCodeState, value);
      },
    []
  );

  return (
    <AutocompleteKintoneField fields={fields} fieldCode={fieldCode} onChange={onFieldChange} />
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
