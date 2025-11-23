import { selectedPluginConditionAtom } from '@/desktop/original-view/states/states';
import { useAtomValue } from 'jotai';
import { IconAIDefault } from '../../ui/icon-ai-default';

export default function AiIcon() {
  const selectedCondition = useAtomValue(selectedPluginConditionAtom);

  const src = selectedCondition.aiIcon;

  if (src) {
    return <img className='rad:object-cover rad:w-full rad:h-full' src={src} />;
  }

  return <IconAIDefault className='rad:w-full rad:h-full' />;
}
