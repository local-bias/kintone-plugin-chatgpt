import { cn } from '@/lib/utils';
import styled from '@emotion/styled';
import { isMobile } from '@konomi-app/kintone-utilities';
import NewChatButton from '../new-chat';
import Examples from './examples';
import FileInput from './file-input';
import Files from './files';
import Input from './input';
import SendButton from './send-button';
import SendingOption from './sending-option';
import WebSearchToggle from './web-search-toggle';

const InputGroup = styled.div`
  position: relative;
  padding: calc(var(--🐸spacing) * 3);
  overflow: auto;
  border: 1px solid var(--🐸input);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: var(--🐸radius);
`;

export default function UserInput() {
  return (
    <div
      className={cn('rad:z-10 rad:sticky rad:bottom-0 rad:left-0 rad:w-full rad:bg-white', {
        'rad:fixed rad:left-1/2 rad:w-[100dvw] rad:-translate-x-1/2': isMobile(),
      })}
    >
      <div className='rad:flex rad:flex-col rad:py-2! rad:px-4! rad:gap-3 rad:max-w-[900px] rad:mx-auto!'>
        <Examples />
        <div className='rad:flex rad:justify-between rad:items-end rad:gap-8'>
          <div>
            <WebSearchToggle />
          </div>
          <div className='rad:flex rad:items-end rad:gap-8'>
            <div className='rad:hidden rad:md:block rad:text-xs rad:text-gray-500'>
              <SendingOption />
            </div>
            <div>
              <NewChatButton />
            </div>
            <div>
              <SendButton />
            </div>
          </div>
        </div>
        <InputGroup>
          <div className='rad:flex'>
            <Input />
            <FileInput />
          </div>
          <Files />
        </InputGroup>
      </div>
      <div className='rad:text-center rad:text-[10px] rad:md:text-xs rad:text-gray-500 rad:mb-1'>
        アシスタントは不正確な情報を表示することがあるため、生成された回答を再確認するようにしてください。
      </div>
    </div>
  );
}
