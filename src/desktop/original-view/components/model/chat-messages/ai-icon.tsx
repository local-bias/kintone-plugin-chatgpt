import React, { FC } from 'react';
import { ChatGPTIcon } from '../../ui/chatgpt-icon';
import { useRecoilValue } from 'recoil';
import { pluginConfigState } from '@/desktop/original-view/states/states';

const Component: FC = () => {
  const pluginConfig = useRecoilValue(pluginConfigState);

  if (!pluginConfig?.aiIcon) {
    return <ChatGPTIcon />;
  }

  return <img src={pluginConfig.aiIcon} />;
};

export default Component;
