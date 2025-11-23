import {
  displayChatHistoriesAtom,
  handleChatHistoryDeleteAtom,
  handleHistoryIdSelectAtom,
  historiesFetchedAtom,
  loadingAtom,
  selectedHistoryIdAtom,
} from '@/desktop/original-view/states/states';
import { pluginConditionsAtom } from '@/desktop/public-state';
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
import { useAtomValue, useSetAtom } from 'jotai';

function ChatHistories({ className }: { className?: string }) {
  const histories = useAtomValue(displayChatHistoriesAtom);
  const setSelectedHistoryId = useSetAtom(handleHistoryIdSelectAtom);
  const removeSelectedHistory = useSetAtom(handleChatHistoryDeleteAtom);
  const historiesFetched = useAtomValue(historiesFetchedAtom);
  const selectedHistoryId = useAtomValue(selectedHistoryIdAtom);
  const loading = useAtomValue(loadingAtom);
  const pluginConditions = useAtomValue(pluginConditionsAtom);

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
        {histories.map((history, index) => {
          const assistant = pluginConditions.find((c) => c.id === history.assistantId);
          const iconUrl = assistant?.aiIcon;

          return (
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
                  {iconUrl ? (
                    <img src={iconUrl} alt={history.title} loading='lazy' width={24} height={24} />
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
          );
        })}
      </List>
    </div>
  );
}

const StyledChatHistories = styled(ChatHistories)`
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

export default StyledChatHistories;
