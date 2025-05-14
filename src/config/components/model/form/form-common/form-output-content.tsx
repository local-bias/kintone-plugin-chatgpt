import { outputAppTextPropertiesState } from '@/config/states/kintone';
import { outputContentFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC, memo, Suspense } from 'react';
import { AutocompleteKintoneField } from './autocomplete-field-input';

const handleFieldCodeChangeAtom = atom(null, (_, set, value: string) => {
  set(outputContentFieldCodeAtom, value);
});

const Component: FC = () => {
  const fields = useAtomValue(outputAppTextPropertiesState);
  const fieldCode = useAtomValue(outputContentFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldCodeChangeAtom);

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
