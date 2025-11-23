import { logAppTextPropertiesWithoutKeyState } from '@/config/states/kintone';
import { logContentFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { AutocompleteFieldInput } from './autocomplete-field-input';

const handleFieldCodeChangeAtom = atom(null, (_, set, value: string) => {
  set(logContentFieldCodeAtom, value);
});

function FormLogContentComponent() {
  const fields = useAtomValue(logAppTextPropertiesWithoutKeyState);
  const fieldCode = useAtomValue(logContentFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldCodeChangeAtom);

  return (
    <AutocompleteFieldInput
      label='内容を格納するフィールド'
      fields={fields}
      fieldCode={fieldCode ?? ''}
      onChange={onFieldChange}
    />
  );
}

export default function FormLogContent() {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <FormLogContentComponent />
    </Suspense>
  );
}
