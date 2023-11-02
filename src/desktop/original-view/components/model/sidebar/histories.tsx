import {
  historiesFetchedState,
  loadingState,
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
import { useRecoilValue } from 'recoil';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import { useChatHistory } from '@/desktop/original-view/hooks/use-chat-history';

const Component: FCX = ({ className }) => {
  const { histories, setSelectedHistoryId, removeSelectedHistory } = useChatHistory();
  const historiesFetched = useRecoilValue(historiesFetchedState);
  const selectedHistoryId = useRecoilValue(selectedHistoryIdState);
  const loading = useRecoilValue(loadingState);

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
                <ChatIcon />
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
