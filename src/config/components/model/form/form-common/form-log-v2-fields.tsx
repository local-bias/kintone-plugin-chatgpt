import { logAppTextPropertiesState } from '@/config/states/kintone';
import {
  logAppV2AssistantIdFieldCodeAtom,
  logAppV2ContentFieldCodeAtom,
  logAppV2RoleFieldCodeAtom,
  logAppV2SessionIdFieldCodeAtom,
  logAppVersionAtom,
} from '@/config/states/plugin';
import { PluginFormDescription } from '@konomi-app/kintone-utilities-react';
import { Skeleton } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { AutocompleteFieldInput } from './autocomplete-field-input';

function LogV2FieldsFormComponent() {
  const fields = useAtomValue(logAppTextPropertiesState);

  const [sessionIdFieldCode, setSessionIdFieldCode] = useAtom(logAppV2SessionIdFieldCodeAtom);
  const [assistantIdFieldCode, setAssistantIdFieldCode] = useAtom(logAppV2AssistantIdFieldCodeAtom);
  const [roleFieldCode, setRoleFieldCode] = useAtom(logAppV2RoleFieldCodeAtom);
  const [contentFieldCode, setContentFieldCode] = useAtom(logAppV2ContentFieldCodeAtom);

  return (
    <>
      <PluginFormDescription>
        V2形式でログを保存するために必要なフィールドを指定してください。V2形式ではレコードの追加操作のみ行うため、すべてのフィールドが任意となります。
      </PluginFormDescription>
      <PluginFormDescription last>
        各フィールドは文字列型(1行テキストまたは複数行テキスト)を選択してください。
      </PluginFormDescription>

      <div className='grid gap-4'>
        <AutocompleteFieldInput
          fields={fields}
          fieldCode={sessionIdFieldCode ?? ''}
          onChange={setSessionIdFieldCode}
          label='セッションIDフィールド'
        />

        <AutocompleteFieldInput
          fields={fields}
          fieldCode={assistantIdFieldCode ?? ''}
          onChange={setAssistantIdFieldCode}
          label='アシスタントIDフィールド'
        />

        <AutocompleteFieldInput
          fields={fields}
          fieldCode={roleFieldCode ?? ''}
          onChange={setRoleFieldCode}
          label='ロール(user/assistant)フィールド'
        />

        <AutocompleteFieldInput
          fields={fields}
          fieldCode={contentFieldCode ?? ''}
          onChange={setContentFieldCode}
          label='メッセージ内容フィールド'
        />
      </div>
    </>
  );
}

export default function LogV2FieldsForm() {
  const version = useAtomValue(logAppVersionAtom);

  if (version !== 'v2') {
    return null;
  }

  return (
    <div className='mb-4'>
      <Suspense fallback={<Skeleton variant='rectangular' width={210} height={118} />}>
        <LogV2FieldsFormComponent />
      </Suspense>
    </div>
  );
}
