import { useRecoilCallback } from 'recoil';
import { pluginConfigState, selectedHistoryState } from '../states/states';
import { upsertRecord, withSpaceIdFallback } from '@konomi-app/kintone-utilities';

export const useKintoneApp = () => {
  const updateApp = useRecoilCallback(
    ({ snapshot }) =>
      async (params: {
        appId: string;
        keyFieldCode: string;
        contentFieldCode: string;
        spaceId?: string;
      }) => {
        const { appId, keyFieldCode, contentFieldCode, spaceId } = params;
        const selectedHistory = await snapshot.getPromise(selectedHistoryState);
        if (!selectedHistory) {
          throw new Error('チャットが選択されていません');
        }

        console.log({ appId, keyFieldCode, contentFieldCode, spaceId });

        await withSpaceIdFallback({
          spaceId,
          func: upsertRecord,
          funcParams: {
            app: appId,
            updateKey: {
              field: keyFieldCode,
              value: selectedHistory.id,
            },
            record: {
              [keyFieldCode]: { value: selectedHistory.id },
              [contentFieldCode]: { value: JSON.stringify(selectedHistory) },
            },
            debug: process.env.NODE_ENV === 'development',
          },
        });
      },
    []
  );

  const updateOutputApp = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const config = await snapshot.getPromise(pluginConfigState);

        const {
          outputAppId: appId,
          outputAppSpaceId: spaceId,
          outputContentFieldCode: contentFieldCode,
          outputKeyFieldCode: keyFieldCode,
        } = config;

        if (!appId || !contentFieldCode || !keyFieldCode) {
          process.env.NODE_ENV === 'development' && console.warn('Content app is not configured');
          return;
        }

        await updateApp({ appId, keyFieldCode, contentFieldCode, spaceId });
      },
    []
  );

  const updateLogApp = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const config = await snapshot.getPromise(pluginConfigState);

        const {
          logAppId: appId,
          logAppSpaceId: spaceId,
          logContentFieldCode: contentFieldCode,
          logKeyFieldCode: keyFieldCode,
        } = config;

        if (!appId || !contentFieldCode || !keyFieldCode) {
          process.env.NODE_ENV === 'development' && console.warn('Log app is not configured');
          return;
        }

        await updateApp({ appId, keyFieldCode, contentFieldCode, spaceId });
      },
    []
  );

  return { updateOutputApp, updateLogApp };
};
