import { Tab } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { assistantLengthState, tabIndexState } from '../../../states/plugin';
import { PluginConditionTabs } from '@konomi-app/kintone-utilities-react';

const Component: FC = () => {
  const tabIndex = useRecoilValue(tabIndexState);
  const assistantsLength = useRecoilValue(assistantLengthState);

  const onTabChange = useRecoilCallback(
    ({ set }) =>
      (_: any, index: number) => {
        set(tabIndexState, index);
      },
    []
  );

  return (
    <PluginConditionTabs tabIndex={tabIndex} onChange={onTabChange}>
      {new Array(assistantsLength + 1).fill('').map((_, i) => {
        if (i === 0) {
          return <Tab label='共通設定' key={i} />;
        }
        return <Tab label={`AI設定${i}`} key={i} />;
      })}
    </PluginConditionTabs>
  );
};

export default Component;
