import { outputAppSingleLineTextPropertiesState } from '@/config/states/kintone';
import { outputKeyFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { AutocompleteFieldInput } from './autocomplete-field-input';

const handleFieldChangeAtom = atom(null, (_, set, value: string) => {
  set(outputKeyFieldCodeAtom, value);
});

function FormOutputKeyComponent() {
  const fields = useAtomValue(outputAppSingleLineTextPropertiesState);
  const fieldCode = useAtomValue(outputKeyFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldChangeAtom);

  return (
    <AutocompleteFieldInput
      label='キー情報を格納するフィールド'
      fields={fields}
      fieldCode={fieldCode}
      onChange={onFieldChange}
    />
  );
}

export default function FormOutputKey() {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <FormOutputKeyComponent />
    </Suspense>
  );
}
