import React, { FCX } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  pluginConfigState,
  selectedAssistantIndexState,
} from '@/desktop/original-view/states/states';
import { ChatGPTIcon } from '../../ui/chatgpt-icon';

const Component: FCX = () => {
  const config = useRecoilValue(pluginConfigState);
  const [assistantIndex, setAssistantIndex] = useRecoilState(selectedAssistantIndexState);

  const onAssistantClick = (index: number) => {
    setAssistantIndex(index);
  };

  return (
    <div className='py-8 px-4 max-w-content mx-auto'>
      {config.conditions.length === 1 && (
        <div className='grid gap-4 py-12'>
          <div className='justify-self-center w-12 h-12'>
            {!!config.conditions[0].aiIcon ? (
              <img className='object-cover w-full h-full' src={config.conditions[0].aiIcon} />
            ) : (
              <ChatGPTIcon />
            )}
          </div>
          <div>{config.conditions[0].description}</div>
          <div className='text-sm text-gray-400'>画面下部の入力欄から質問を入力してください。</div>
        </div>
      )}
      {config.conditions.length > 1 && (
        <>
          <div className='mb-8'>使用するアシスタントを選択してください。</div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-6'>
            {config.conditions.map((assistant, i) => (
              <div
                key={i}
                data-selected={i === assistantIndex ? '' : undefined}
                className='py-4 px-4 md:px-8 rounded flex gap-8 transition-all cursor-pointer border border-solid border-gray-200 bg-white hover:bg-gray-100 data-[selected]:bg-blue-100 data-[selected]:hover:bg-blue-200'
                onClick={() => onAssistantClick(i)}
              >
                <div className='w-16 h-16 rounded overflow-hidden'>
                  {!!assistant.aiIcon ? (
                    <img className='object-cover w-full h-full' src={assistant.aiIcon} />
                  ) : (
                    <ChatGPTIcon />
                  )}
                </div>
                <div className='flex-1'>
                  <div className='text-lg text-gray-700'>{assistant.name}</div>
                  <div className='text-sm text-gray-500'>{assistant.description}</div>
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
