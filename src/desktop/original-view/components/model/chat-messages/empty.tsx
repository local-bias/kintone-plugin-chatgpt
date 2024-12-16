import { selectedPluginConditionIdAtom } from '@/desktop/original-view/states/states';
import { pluginConditionsAtom } from '@/desktop/public-state';
import { useAtom, useAtomValue } from 'jotai';
import React, { FCX } from 'react';
import { ChatGPTIcon } from '../../ui/chatgpt-icon';

const Component: FCX = () => {
  const conditions = useAtomValue(pluginConditionsAtom);
  const [selectedId, setAssistantIndex] = useAtom(selectedPluginConditionIdAtom);

  const onAssistantClick = (id: string) => {
    setAssistantIndex(id);
  };

  return (
    <div className='py-8 px-4 max-w-content mx-auto'>
      {conditions.length === 1 && (
        <div className='grid gap-4 py-12'>
          <div className='justify-self-center w-12 h-12'>
            {conditions[0].aiIcon ? (
              <img className='object-cover w-full h-full' src={conditions[0].aiIcon} />
            ) : (
              <ChatGPTIcon />
            )}
          </div>
          <div>{conditions[0].description}</div>
          <div className='text-sm text-gray-400'>画面下部の入力欄から質問を入力してください。</div>
        </div>
      )}
      {conditions.length > 1 && (
        <>
          <div className='mb-8'>使用するアシスタントを選択してください。</div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-6'>
            {conditions.map((condition) => (
              <div
                key={condition.id}
                data-selected={condition.id === selectedId ? '' : undefined}
                className='py-4 px-4 md:px-8 rounded flex gap-8 transition-all cursor-pointer border border-solid border-gray-200 bg-white hover:bg-gray-100 data-[selected]:bg-blue-100 data-[selected]:hover:bg-blue-200'
                onClick={() => onAssistantClick(condition.id)}
              >
                <div className='w-16 h-16 rounded overflow-hidden'>
                  {condition.aiIcon ? (
                    <img className='object-cover w-full h-full' src={condition.aiIcon} />
                  ) : (
                    <ChatGPTIcon />
                  )}
                </div>
                <div className='flex-1'>
                  <div className='text-lg text-gray-700'>{condition.name}</div>
                  <div className='text-sm text-gray-500'>{condition.description}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Component;
