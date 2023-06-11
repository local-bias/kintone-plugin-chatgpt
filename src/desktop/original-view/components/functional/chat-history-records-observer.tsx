import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatHistoryRecordsState, pluginConditionState } from '../../states/states';
import { getAllRecords } from '@konomi-app/kintone-utilities';

const Component: FC = () => {
  const condition = useRecoilValue(pluginConditionState);
  const setChatHistoryRecords = useSetRecoilState(chatHistoryRecordsState);

  useEffect(() => {
    if (!condition) {
      return;
    }
    const { outputAppId, outputContentFieldCode } = condition;
    if (!outputAppId || !outputContentFieldCode) {
      return;
    }
    (async () => {
      const records = await getAllRecords({
        app: outputAppId,
        fields: ['$id', outputContentFieldCode],
      });
      setChatHistoryRecords(records);
    })();
  }, [condition]);

  return null;
};

export default Component;
