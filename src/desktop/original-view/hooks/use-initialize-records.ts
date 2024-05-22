import { getAllRecords, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { chatHistoriesState, historiesFetchedState, pluginConfigState } from '../states/states';
import { migrateChatHistory } from '../action';

export const useInitializeRecords = () => {
  const config = useRecoilValue(pluginConfigState);

  const initialize = useRecoilCallback(
    ({ set }) =>
      async (config: kintone.plugin.LatestStorage) => {
        const { outputAppId, outputAppSpaceId, outputContentFieldCode } = config;
        if (!outputAppId || !outputContentFieldCode) {
          set(historiesFetchedState, true);
          return;
        }
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
        set(chatHistoriesState, (_current) => [..._current, ...histories]);
        set(historiesFetchedState, true);
      },
    []
  );

  useEffect(() => {
    if (config) {
      initialize(config);
    }
  }, [config]);

  return null;
};
