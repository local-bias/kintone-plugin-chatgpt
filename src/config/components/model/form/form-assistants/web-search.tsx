import { allowWebSearchAtom } from '@/config/states/plugin';
import { JotaiSwitch } from '@konomi-app/kintone-utilities-jotai';
import { PluginFormDescription, PluginFormTitle } from '@konomi-app/kintone-utilities-react';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';

function WebSearchSwitchContent() {
  return (
    <div>
      <PluginFormTitle>ウェブ検索</PluginFormTitle>
      <PluginFormDescription>
        有効にすると、チャット入力欄の上部にユーザーが切り替えられるウェブ検索トグルが表示されます。
      </PluginFormDescription>
      <PluginFormDescription last>
        ユーザーはチャット画面で必要に応じてウェブ検索をオン/オフできます。
      </PluginFormDescription>
      <JotaiSwitch atom={allowWebSearchAtom} label='ウェブ検索を許可する' />
    </div>
  );
}

function WebSearchSwitchFallback() {
  return (
    <div>
      <PluginFormTitle>ウェブ検索</PluginFormTitle>
      <Skeleton variant='rounded' height={32} width={200} />
    </div>
  );
}

export default function WebSearchSwitch() {
  return (
    <Suspense fallback={<WebSearchSwitchFallback />}>
      <WebSearchSwitchContent />
    </Suspense>
  );
}
