import {
  apiErrorMessageState,
  chatHistoriesState,
  historiesFetchedState,
  loadingState,
  pluginConfigState,
  selectedHistoryIdState,
} from '@/desktop/original-view/states/states';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import React, { FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import { deleteAllRecordsByQuery, isGuestSpace } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { useSnackbar } from 'notistack';

const Component: FCX = ({ className }) => {
  const historiesFetched = useRecoilValue(historiesFetchedState);
  const histories = useRecoilValue(chatHistoriesState);
  const selectedHistoryId = useRecoilValue(selectedHistoryIdState);
  const loading = useRecoilValue(loadingState);
  const { enqueueSnackbar } = useSnackbar();

  const onHistoryChange = useRecoilCallback(
    ({ reset, set }) =>
      (historyId: string) => {
        set(selectedHistoryIdState, historyId);
        reset(apiErrorMessageState);
      },
    []
  );

  const onDeleteButtonClick = useRecoilCallback(
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

  if (!historiesFetched) {
    return (
      <div>
        <List>
          {new Array(3).fill('').map((_, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText>
                  <Skeleton />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  return (
    <div className={className}>
      <List>
        {histories.map((history, index) => (
          <ListItem
            key={index}
            onClick={() => onHistoryChange(history.id)}
            disablePadding
            sx={{
              backgroundColor: selectedHistoryId === history.id ? '#1976d222' : undefined,
              position: 'relative',
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={history.title} />
              {selectedHistoryId === history.id && (
                <IconButton
                  onClick={onDeleteButtonClick}
                  disabled={loading}
                  sx={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const StyledComponent = styled(Component)`
  max-height: 600px;
  overflow-y: auto;
`;

export default StyledComponent;
