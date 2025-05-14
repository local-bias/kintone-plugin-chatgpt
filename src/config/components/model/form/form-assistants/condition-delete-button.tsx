import { handlePluginConditionDeleteAtom, hasMultipleConditionsAtom } from '@/config/states/plugin';
import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import { useAtomValue, useSetAtom } from 'jotai';

function ConditionDeleteButtonContent() {
  const onClick = useSetAtom(handlePluginConditionDeleteAtom);
  return <PluginConditionDeleteButton {...{ onClick }} />;
}

export default function ConditionDeleteButton() {
  const isShown = useAtomValue(hasMultipleConditionsAtom);
  return isShown ? <ConditionDeleteButtonContent /> : null;
}
