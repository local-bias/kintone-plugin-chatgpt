import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { upsertRecord, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { selectedHistoryAtom } from '../states/states';

export const useKintoneApp = () => {
  const updateApp = useAtomCallback(
    useCallback(
      async (
        get,
        set,
        params: {
          appId: string;
          keyFieldCode: string;
          contentFieldCode: string;
          spaceId?: string;
        }
      ) => {
        const { appId, keyFieldCode, contentFieldCode, spaceId } = params;
        const selectedHistory = get(selectedHistoryAtom);
        if (!selectedHistory) {
          throw new Error('チャットが選択されていません');
        }

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
    )
  );

  const updateOutputApp = useAtomCallback(
    useCallback(async (get) => {
      const common = get(pluginCommonConfigAtom);

      const {
        outputAppId: appId,
        outputAppSpaceId: spaceId,
        outputContentFieldCode: contentFieldCode,
        outputKeyFieldCode: keyFieldCode,
      } = common;

      if (!appId || !contentFieldCode || !keyFieldCode) {
        process.env.NODE_ENV === 'development' && console.warn('Content app is not configured');
        return;
      }

      await updateApp({ appId, keyFieldCode, contentFieldCode, spaceId });
    }, [])
  );

  const updateLogApp = useAtomCallback(
    useCallback(async (get) => {
      const common = get(pluginCommonConfigAtom);

      const {
        logAppId: appId,
        logAppSpaceId: spaceId,
        logContentFieldCode: contentFieldCode,
        logKeyFieldCode: keyFieldCode,
      } = common;

      if (!appId || !contentFieldCode || !keyFieldCode) {
        process.env.NODE_ENV === 'development' && console.warn('Log app is not configured');
        return;
      }

      await updateApp({ appId, keyFieldCode, contentFieldCode, spaceId });
    }, [])
  );

  return { updateOutputApp, updateLogApp };
};
