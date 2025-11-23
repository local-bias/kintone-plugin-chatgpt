import { handlePushUserMessageAtom } from '@/desktop/original-view/states/chat-history';
import { handleSendMessageAtom } from '@/desktop/original-view/states/chat-message';
import { inputTextAtom, loadingAtom } from '@/desktop/original-view/states/states';
import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { useAtom, useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { ChangeEventHandler, KeyboardEventHandler, useCallback } from 'react';

export default function ChatInput() {
  const commonConfig = useAtomValue(pluginCommonConfigAtom);
  const [input, setInput] = useAtom(inputTextAtom);
  const { enablesEnter, enablesShiftEnter } = commonConfig;

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput(e.target.value);
  };

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useAtomCallback(
    useCallback(async (get, set, event) => {
      const loading = get(loadingAtom);
      if (loading) {
        return;
      }
      const isEnter = event.key === 'Enter';
      const isShift = event.shiftKey;

      if ((enablesEnter && isEnter && !isShift) || (enablesShiftEnter && isEnter && isShift)) {
        event.preventDefault();
        await set(handlePushUserMessageAtom);
        await set(handleSendMessageAtom);
      }
    }, [])
  );

  const presumedRows = Math.max(input.split('\n').length, Math.ceil(input.length / 84));

  return (
    <textarea
      className='rad:flex-1 rad:resize-none rad:border-0 rad:placeholder:text-gray-400'
      value={input}
      onChange={onChange}
      onKeyDown={onKeyDown}
      rows={Math.max(3, Math.min(10, presumedRows))}
      placeholder='ここにメッセージを入力'
    />
  );
}
