import { outputAppSingleLineTextPropertiesState } from '@/config/states/kintone';
import { outputKeyFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC, FCX, memo, Suspense } from 'react';
import { AutocompleteKintoneField } from './autocomplete-field-input';

const handleFieldChangeAtom = atom(null, (_, set, value: string) => {
  set(outputKeyFieldCodeAtom, value);
});

const Component: FCX = () => {
  const fields = useAtomValue(outputAppSingleLineTextPropertiesState);
  const fieldCode = useAtomValue(outputKeyFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldChangeAtom);

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
