import { pluginConfigState } from '@/desktop/original-view/states/states';
import React, { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

const Component: FC = () => {
  const config = useRecoilValue(pluginConfigState);
  const { enablesEnter, enablesShiftEnter } = config;

  if (enablesEnter) {
    return <div>Enterキーで送信</div>;
  }

  if (enablesShiftEnter) {
    return <div>Shift + Enterキーで送信</div>;
  }

  return null;
};

export default memo(Component);
