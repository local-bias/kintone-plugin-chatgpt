import { useChatHistory } from '@/desktop/original-view/hooks/use-chat-history';
import {
  displayChatHistoriesAtom,
  historiesFetchedAtom,
  loadingAtom,
  selectedHistoryIdAtom,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import React, { FCX } from 'react';

const Component: FCX = ({ className }) => {
  const histories = useAtomValue(displayChatHistoriesAtom);
  const { setSelectedHistoryId, removeSelectedHistory } = useChatHistory();
  const historiesFetched = useAtomValue(historiesFetchedAtom);
  const selectedHistoryId = useAtomValue(selectedHistoryIdAtom);
  const loading = useAtomValue(loadingAtom);

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
            disablePadding
            sx={{
              backgroundColor: selectedHistoryId === history.id ? '#1976d222' : undefined,
              position: 'relative',
            }}
          >
            <ListItemButton disabled={loading} onClick={() => setSelectedHistoryId(history.id)}>
              <ListItemIcon>
                {history.iconUrl ? (
                  <img
                    src={history.iconUrl}
                    alt={history.title}
                    loading='lazy'
                    width={24}
                    height={24}
                  />
                ) : (
                  <ChatIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={history.title} />
              {selectedHistoryId === history.id && (
                <IconButton
                  onClick={removeSelectedHistory}
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
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0005;
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export default StyledComponent;
