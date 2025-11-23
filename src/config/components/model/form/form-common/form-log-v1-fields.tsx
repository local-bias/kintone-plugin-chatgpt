import { logAppVersionAtom } from '@/config/states/plugin';
import { PluginFormDescription } from '@konomi-app/kintone-utilities-react';
import { useAtomValue } from 'jotai';
import LogContentForm from './form-log-content';
import LogKeyForm from './form-log-key';

function LogV1FieldsFormComponent() {
  return (
    <>
      <PluginFormDescription last>
        ログを円滑に更新するために、チャットとログを紐づけるキー情報を格納するフィールドが必要になります。
      </PluginFormDescription>
      <div className='mb-4'>
        <LogKeyForm />
      </div>
      <div>
        <LogContentForm />
      </div>
    </>
  );
}

export default function LogV1FieldsForm() {
  const version = useAtomValue(logAppVersionAtom);

  if (version !== 'v1') {
    return null;
  }

  return (
    <div className='mb-4'>
      <LogV1FieldsFormComponent />
    </div>
  );
}
