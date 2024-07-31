import React, { FC } from 'react';
import CommonForm from './form-common';
import AssistantForm from './form-assistants';
import { useRecoilValue } from 'recoil';
import { commonSettingsShownState } from '@/config/states/plugin';

const Component: FC = () => {
  const commonSettingsShown = useRecoilValue(commonSettingsShownState);
  return commonSettingsShown ? <CommonForm /> : <AssistantForm />;
};

export default Component;
