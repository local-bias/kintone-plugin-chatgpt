import {
  selectedHistoryAtom,
  selectedPluginConditionAtom,
} from '@/desktop/original-view/states/states';
import { useAtomValue } from 'jotai';
import React, { FC } from 'react';
import { ChatGPTIcon } from '../../ui/chatgpt-icon';

const Component: FC = () => {
  const selectedHistory = useAtomValue(selectedHistoryAtom);
  const selectedCondition = useAtomValue(selectedPluginConditionAtom);

  const src = selectedHistory?.iconUrl ?? selectedCondition.aiIcon;

  if (src) {
    return <img className='object-cover w-full h-full' src={src} />;
  }

  return <ChatGPTIcon />;
};

export default Component;
