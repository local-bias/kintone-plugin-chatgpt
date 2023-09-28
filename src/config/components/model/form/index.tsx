import React, { FC } from 'react';
import CommonForm from './form-common';
import AssistantForm from './form-assistants';
import { useRecoilValue } from 'recoil';
import { tabIndexState } from '@/config/states/plugin';

const Component: FC = () => {
  const tabIndex = useRecoilValue(tabIndexState);

  if (tabIndex === 0) {
    return <CommonForm />;
  }
  return <AssistantForm />;
};

export default Component;
