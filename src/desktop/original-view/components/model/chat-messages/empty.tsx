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
    <div className='py-8 px-4 w-full max-w-[900px] mx-auto h-[440px] overflow-y-auto'>
      <div className='mb-8'>使用するアシスタントを選択してください。</div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6'>
        {config.assistants.map((assistant, i) => (
          <div
            key={i}
            className={`py-4 px-8 rounded flex gap-8 transition-all cursor-pointer ${
              i === assistantIndex ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => onAssistantClick(i)}
          >
            <div className='w-16 h-16 rounded overflow-hidden'>
              {!!assistant.aiIcon ? (
                <img className='object-cover w-full h-full' src={assistant.aiIcon} />
              ) : (
                <ChatGPTIcon />
              )}
            </div>
            <div>
              <div className='text-lg text-gray-700'>{assistant.name}</div>
              <div className='text-sm text-gray-500'>{assistant.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component;
