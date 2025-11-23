import { selectedPluginConditionIdAtom } from '@/desktop/original-view/states/states';
import { pluginConditionsAtom } from '@/desktop/public-state';
import { useAtom, useAtomValue } from 'jotai';
import { IconAIDefault } from '../../ui/icon-ai-default';

export default function EmptyChat() {
  const conditions = useAtomValue(pluginConditionsAtom);
  const [selectedId, setAssistantIndex] = useAtom(selectedPluginConditionIdAtom);

  const onAssistantClick = (id: string) => {
    setAssistantIndex(id);
  };

  return (
    <div className='rad:py-8! rad:px-4! rad:max-w-[900px] rad:mx-auto!'>
      {conditions.length === 1 && (
        <div className='rad:grid rad:gap-4 rad:py-12!'>
          <div className='rad:justify-self-center rad:w-12 rad:h-12'>
            {conditions[0].aiIcon ? (
              <img className='rad:object-cover rad:w-full rad:h-full' src={conditions[0].aiIcon} />
            ) : (
              <IconAIDefault className='rad:w-full rad:h-full' />
            )}
          </div>
          <div>{conditions[0].description}</div>
          <div className='rad:text-sm rad:text-gray-400'>
            画面下部の入力欄から質問を入力してください。
          </div>
        </div>
      )}
      {conditions.length > 1 && (
        <>
          <div className='rad:mb-8!'>使用するアシスタントを選択してください。</div>
          <div className='rad:grid rad:grid-cols-1 rad:lg:grid-cols-2 rad:gap-x-4 rad:gap-y-3 rad:md:gap-y-6'>
            {conditions.map((condition) => (
              <div
                key={condition.id}
                data-selected={condition.id === selectedId ? '' : undefined}
                className='rad:py-4! rad:px-4! rad:md:px-8! rad:rounded rad:flex rad:gap-8 rad:transition-all rad:cursor-pointer rad:border! rad:border-border rad:border-solid rad:bg-white rad:hover:bg-gray-100 rad:data-[selected]:bg-blue-100 rad:data-[selected]:hover:bg-blue-200'
                onClick={() => onAssistantClick(condition.id)}
              >
                <div className='rad:w-16 rad:h-16 rad:rounded rad:overflow-hidden'>
                  {condition.aiIcon ? (
                    <img
                      className='rad:object-cover rad:w-full rad:h-full'
                      src={condition.aiIcon}
                    />
                  ) : (
                    <IconAIDefault className='rad:w-full rad:h-full' />
                  )}
                </div>
                <div className='rad:flex-1'>
                  <div className='rad:text-lg rad:text-gray-700'>{condition.name}</div>
                  <div className='rad:text-sm rad:text-gray-500'>{condition.description}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
