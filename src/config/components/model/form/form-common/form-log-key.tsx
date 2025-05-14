import { logAppTextPropertiesWithoutContentState } from '@/config/states/kintone';
import { logKeyFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC, memo, Suspense } from 'react';
import { AutocompleteKintoneField } from './autocomplete-field-input';

const handleFieldChangeAtom = atom(null, (_, set, value: string) => {
  set(logKeyFieldCodeAtom, value);
});

const Component: FC = () => {
  const fields = useAtomValue(logAppTextPropertiesWithoutContentState);
  const fieldCode = useAtomValue(logKeyFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldChangeAtom);

  return (
    <AutocompleteKintoneField
      label='キー情報を格納するフィールド'
      fields={fields}
      fieldCode={fieldCode ?? ''}
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
