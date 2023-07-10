import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ChatMessage,
  chatHistoriesState,
  historiesFetchedState,
  pluginConfigState,
} from '../../states/states';
import { getAllRecords, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { ChatCompletionRequestMessage } from 'openai';

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
          const messages: ChatMessage[] = JSON.parse(
            record[outputContentFieldCode].value as string
          );
          const id = record.$id.value as string;
          //@ts-ignore
          return { id, title: messages[0]?.content.slice(0, 8) ?? id, messages };
        });
      process.env.NODE_ENV === 'development' && console.log('⌛ histories', histories);
      setChatHistoryRecords((_current) => [..._current, ...histories]);
      setHistoriesFetched(true);
    })();
  }, [config]);

  return null;
};

export default Component;
