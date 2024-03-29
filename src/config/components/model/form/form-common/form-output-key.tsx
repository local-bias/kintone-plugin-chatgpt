import { outputKeyFieldCodeState } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { AutocompleteKintoneField } from './autocomplete-field-input';
import { outputAppSingleLineTextPropertiesState } from '@/config/states/kintone';

const Component: FCX = () => {
  const fields = useRecoilValue(outputAppSingleLineTextPropertiesState);
  const fieldCode = useRecoilValue(outputKeyFieldCodeState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(outputKeyFieldCodeState, value);
      },
    []
  );

  return (
    <AutocompleteKintoneField
      label='キー情報を格納するフィールド'
      fields={fields}
      fieldCode={fieldCode}
      onChange={onFieldChange}
    />
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
