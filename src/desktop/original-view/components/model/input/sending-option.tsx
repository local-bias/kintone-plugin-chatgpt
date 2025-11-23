import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { useAtomValue } from 'jotai';

export default function SendingOption() {
  const commonConfig = useAtomValue(pluginCommonConfigAtom);
  const { enablesEnter, enablesShiftEnter } = commonConfig;

  if (enablesEnter) {
    return <div>Enterキーで送信</div>;
  }

  if (enablesShiftEnter) {
    return <div>Shift + Enterキーで送信</div>;
  }

  return null;
}
