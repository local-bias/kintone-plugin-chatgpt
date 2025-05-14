import { pluginConditionsAtom, selectedConditionIdAtom } from '@/config/states/plugin';
import { getNewCondition, isPluginConditionMet } from '@/lib/plugin';
import { PluginCondition } from '@/schema/plugin-config';
import { BundledSidebar } from '@konomi-app/kintone-utilities-react';
import { useAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';

const Sidebar: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [conditions, setConditions] = useAtom(pluginConditionsAtom);
  const [selectedConditionId, setSelectedConditionId] = useAtom(selectedConditionIdAtom);
  const label = useCallback((params: { condition: PluginCondition; index: number }) => {
    const { condition, index } = params;
    return (
      <div>
        <div className='text-[11px] leading-4 text-gray-400'>{`アシスタント${index + 1}`}</div>
        <div className='text-sm text-gray-600'>{`${condition.name ? condition.name : '未設定'}`}</div>
      </div>
    );
  }, []);

  const onSelectedConditionChange = (condition: PluginCondition | null) => {
    setSelectedConditionId(condition?.id ?? null);
  };

  const onConditionDelete = () => {
    enqueueSnackbar('アシスタント設定を削除しました', { variant: 'success' });
  };

  return (
    <BundledSidebar
      conditions={conditions}
      setConditions={setConditions}
      getNewCondition={getNewCondition}
      labelComponent={label}
      onSelectedConditionChange={onSelectedConditionChange}
      selectedConditionId={selectedConditionId}
      commonTab
      onConditionDelete={onConditionDelete}
      context={{
        onCopy: () => {
          enqueueSnackbar('アシスタント設定をコピーしました', { variant: 'success' });
        },
        onPaste: () => {
          enqueueSnackbar('アシスタント設定を更新しました', { variant: 'success' });
          return null;
        },
        onPasteValidation: (condition) => isPluginConditionMet(condition),
        onPasteValidationError: () => {
          enqueueSnackbar('アシスタント設定の更新に失敗しました', { variant: 'error' });
        },
      }}
    />
  );
};

export default Sidebar;
