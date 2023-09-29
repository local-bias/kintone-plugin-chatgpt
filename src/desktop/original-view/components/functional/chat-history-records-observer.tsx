import { getAllRecords, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatHistoriesState, historiesFetchedState, pluginConfigState } from '../../states/states';
import { migrateChatHistory } from '../../action';

const Component: FC = () => {
  const config = useRecoilValue(pluginConfigState);
  const setChatHistoryRecords = useSetRecoilState(chatHistoriesState);
  const setHistoriesFetched = useSetRecoilState(historiesFetchedState);

  useEffect(() => {
    if (!config) {
      return;
    }
    const { outputAppId, outputAppSpaceId, outputContentFieldCode } = config;
    if (!outputAppId || !outputContentFieldCode) {
      setHistoriesFetched(true);
      return;
    }
    (async () => {
      const records = await withSpaceIdFallback({
        spaceId: outputAppSpaceId,
        func: getAllRecords,
        funcParams: {
          app: outputAppId,
          fields: ['$id', outputContentFieldCode],
          debug: process.env.NODE_ENV === 'development',
        },
      });
      const histories = records
        .filter(
          (record) =>
            record[outputContentFieldCode] &&
            typeof record[outputContentFieldCode].value === 'string'
        )
        .map((record) => {
          const history = migrateChatHistory(
            JSON.parse(record[outputContentFieldCode].value as string)
          );
          return history;
        });
      process.env.NODE_ENV === 'development' && console.log('⌛ histories', histories);
      setChatHistoryRecords((_current) => [..._current, ...histories]);
      setHistoriesFetched(true);
    })();
  }, [config]);

  return null;
};

export default Component;
