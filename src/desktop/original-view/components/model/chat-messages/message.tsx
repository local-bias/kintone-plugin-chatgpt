import { pluginConfigState } from '@/desktop/original-view/states/states';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  message: string;
  typing?: boolean;
  cursor?: boolean;
  className?: string;
  speed?: number;
};

const Component: FC<Props> = ({ message, typing, speed = 20 }) => {
  const [text, setText] = useState('');
  const [typeEnd, setTypeEnd] = useState<boolean>(false);
  const msgEl = useRef<HTMLDivElement>(null);
  const pluginConfig = useRecoilValue(pluginConfigState);

  // 指定された間隔でstateを更新する
  useEffect(() => {
    if (!typing || !pluginConfig?.enablesAnimation) {
      return;
    }
    // マウント時の処理
    const charItr = message[Symbol.iterator]();
    let timerId: NodeJS.Timeout | null = null;

    (function showChar() {
      const nextChar = charItr.next();
      if (nextChar.done) {
        setTypeEnd(true);
        return;
      }
      setText((current) => current + nextChar.value);
      timerId = setTimeout(showChar, speed);
    })();

    // アンマウント時に念のためタイマー解除
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [typing]);

  if (!typing || !pluginConfig?.enablesAnimation || typeEnd) {
    return <div dangerouslySetInnerHTML={{ __html: message }} />;
  }

  return <div ref={msgEl} dangerouslySetInnerHTML={{ __html: text }} />;
};

export default Component;
