import { pluginConfigState } from '@/desktop/original-view/states/states';
import React, { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

const Component: FC = () => {
  const { common } = useRecoilValue(pluginConfigState);
  const { enablesEnter, enablesShiftEnter } = common;

  if (enablesEnter) {
    return <div>Enterキーで送信</div>;
  }

  if (enablesShiftEnter) {
    return <div>Shift + Enterキーで送信</div>;
  }

  return null;
};

export default memo(Component);
