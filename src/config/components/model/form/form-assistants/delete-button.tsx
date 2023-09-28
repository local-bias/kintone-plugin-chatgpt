import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';
import { PluginConditionDeleteButton } from '@konomi-app/kintone-utility-component';
import { assistantsState, tabIndexState } from '@/config/states/plugin';

const Container: FC = () => {
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexState);
  const [assistants, setAssistants] = useRecoilState(assistantsState);
  const assistantIndex = tabIndex - 1;

  if (assistants.length === 1 || assistantIndex < 0) {
    return null;
  }

  const onClick = () => {
    setAssistants((assistants) =>
      produce(assistants, (draft) => {
        draft.splice(assistantIndex, 1);
      })
    );
    setTabIndex((i) => i - 1);
  };

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

export default Container;
