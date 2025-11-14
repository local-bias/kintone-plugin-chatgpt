import {
  selectedHistoryAtom,
  selectedPluginConditionAtom,
} from '@/desktop/original-view/states/states';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { IconAIDefault } from '../../ui/icon-ai-default';

const Component: FC = () => {
  const selectedHistory = useAtomValue(selectedHistoryAtom);
  const selectedCondition = useAtomValue(selectedPluginConditionAtom);

  const src = selectedHistory?.iconUrl ?? selectedCondition.aiIcon;

  if (src) {
    return <img className='object-cover w-full h-full' src={src} />;
  }

  return <IconAIDefault className='w-full h-full' />;
};

export default Component;
