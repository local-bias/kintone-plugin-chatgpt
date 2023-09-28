import React, { FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { produce } from 'immer';

import { createNewAiAssistant } from '@/lib/plugin';
import { assistantsState } from '../../../states/plugin';
import { PluginConditionAppendButton } from '@konomi-app/kintone-utility-component';

const Container: FC = () => {
  const addCondition = useRecoilCallback(
    ({ set }) =>
      () => {
        set(assistantsState, (_storage) =>
          produce(_storage, (draft) => {
            draft.push(createNewAiAssistant());
          })
        );
      },
    []
  );

  return <PluginConditionAppendButton onClick={addCondition} />;
};

export default memo(Container);
