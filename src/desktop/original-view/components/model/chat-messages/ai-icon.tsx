import React, { FC } from 'react';
import { ChatGPTIcon } from '../../ui/chatgpt-icon';
import { useRecoilValue } from 'recoil';
import {
  pluginConfigState,
  selectedAssistantIndexState,
} from '@/desktop/original-view/states/states';

const Component: FC = () => {
  const pluginConfig = useRecoilValue(pluginConfigState);
  const assitantIndex = useRecoilValue(selectedAssistantIndexState);

  const src = pluginConfig.assistants[assitantIndex].aiIcon;

  if (src) {
    return <img className='object-cover w-full h-full' src={src} />;
  }

  return <ChatGPTIcon />;
};

export default Component;
