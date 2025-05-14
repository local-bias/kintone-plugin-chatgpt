import { isConditionIdUnselectedAtom } from '@/config/states/plugin';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import AssistantForm from './form-assistants';
import CommonForm from './form-common';

const Component: FC = () => {
  const commonSettingsShown = useAtomValue(isConditionIdUnselectedAtom);
  return commonSettingsShown ? <CommonForm /> : <AssistantForm />;
};

export default Component;
