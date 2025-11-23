import { outputAppTextPropertiesState } from '@/config/states/kintone';
import { outputContentFieldCodeAtom } from '@/config/states/plugin';
import { Skeleton } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { AutocompleteFieldInput } from './autocomplete-field-input';

const handleFieldCodeChangeAtom = atom(null, (_, set, value: string) => {
  set(outputContentFieldCodeAtom, value);
});

function FormOutputContentComponent() {
  const fields = useAtomValue(outputAppTextPropertiesState);
  const fieldCode = useAtomValue(outputContentFieldCodeAtom);
  const onFieldChange = useSetAtom(handleFieldCodeChangeAtom);

  return <AutocompleteFieldInput fields={fields} fieldCode={fieldCode} onChange={onFieldChange} />;
}

export default function FormOutputContent() {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <FormOutputContentComponent />
    </Suspense>
  );
}
