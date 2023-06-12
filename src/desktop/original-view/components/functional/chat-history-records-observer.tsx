import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatHistoriesState, historiesFetchedState, pluginConfigState } from '../../states/states';
import { getAllRecords } from '@konomi-app/kintone-utilities';
import { ChatCompletionRequestMessage } from 'openai';

const Component: FC = () => {
  const config = useRecoilValue(pluginConfigState);
  const setChatHistoryRecords = useSetRecoilState(chatHistoriesState);
  const setHistoriesFetched = useSetRecoilState(historiesFetchedState);

  useEffect(() => {
    if (!config) {
      return;
    }
    const { outputAppId, outputContentFieldCode } = config;
    if (!outputAppId || !outputContentFieldCode) {
      setHistoriesFetched(true);
      return;
    }
    (async () => {
      const records = await getAllRecords({
        app: outputAppId,
        fields: ['$id', outputContentFieldCode],
      });
      const histories = records
        .filter(
          (record) =>
            record[outputContentFieldCode] &&
            typeof record[outputContentFieldCode].value === 'string'
        )
        .map((record) => {
          const messages: ChatCompletionRequestMessage[] = JSON.parse(
            record[outputContentFieldCode].value as string
          );
          const id = record.$id.value as string;
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
