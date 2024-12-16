import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { useAtomValue } from 'jotai';
import React, { FC, memo } from 'react';

const Component: FC = () => {
  const commonConfig = useAtomValue(pluginCommonConfigAtom);
  const { enablesEnter, enablesShiftEnter } = commonConfig;

  if (enablesEnter) {
    return <div>Enterキーで送信</div>;
  }

  if (enablesShiftEnter) {
    return <div>Shift + Enterキーで送信</div>;
  }

  return null;
};

export default memo(Component);
