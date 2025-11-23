import { logAppTextPropertiesWithoutContentState } from '@/config/states/kintone';
import { logKeyFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { AutocompleteFieldInput } from './autocomplete-field-input';

const handleFieldChangeAtom = atom(null, (_, set, value: string) => {
  set(logKeyFieldCodeAtom, value);
});

function FormLogKeyComponent() {
  const fields = useAtomValue(logAppTextPropertiesWithoutContentState);
  const fieldCode = useAtomValue(logKeyFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldChangeAtom);

  return (
    <AutocompleteFieldInput
      label='キー情報を格納するフィールド'
      fields={fields}
      fieldCode={fieldCode ?? ''}
      onChange={onFieldChange}
    />
  );
}

export default function FormLogKey() {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <FormLogKeyComponent />
    </Suspense>
  );
}
