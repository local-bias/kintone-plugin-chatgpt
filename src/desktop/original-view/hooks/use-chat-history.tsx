import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  apiErrorMessageState,
  chatHistoriesState,
  loadingState,
  pluginConfigState,
  selectedHistoryIdState,
} from '../states/states';
import { deleteAllRecordsByQuery, isGuestSpace } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { useSnackbar } from 'notistack';

export const useChatHistory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const histories = useRecoilValue(chatHistoriesState);

  const setSelectedHistoryId = useRecoilCallback(
    ({ reset, set }) =>
      (historyId: string) => {
        set(selectedHistoryIdState, historyId);
        reset(apiErrorMessageState);
      },
    []
  );

  const removeSelectedHistory = useRecoilCallback(
    ({ reset, set, snapshot }) =>
      async () => {
        try {
          set(loadingState, true);
          const id = (await snapshot.getPromise(selectedHistoryIdState))!;
          const { outputAppId, outputKeyFieldCode, outputAppSpaceId } = await snapshot.getPromise(
            pluginConfigState
          );

          const isGuest = await isGuestSpace(outputAppId);

          const query = `${outputKeyFieldCode} = "${id}"`;

          await deleteAllRecordsByQuery({
            app: outputAppId,
            query,
            debug: process.env.NODE_ENV === 'development',
            guestSpaceId: isGuest ? outputAppSpaceId : undefined,
          });

          set(chatHistoriesState, (_histories) =>
            produce(_histories, (draft) => {
              const index = draft.findIndex((history) => history.id === id);
              draft.splice(index, 1);
            })
          );

          reset(selectedHistoryIdState);
          enqueueSnackbar('履歴を削除しました', { variant: 'success' });
        } finally {
          reset(loadingState);
        }
      },
    []
  );

  return { histories, setSelectedHistoryId, removeSelectedHistory };
};
