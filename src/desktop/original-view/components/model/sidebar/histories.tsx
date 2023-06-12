import {
  apiErrorMessageState,
  chatHistoriesState,
  historiesFetchedState,
  selectedHistoryIdState,
} from '@/desktop/original-view/states/states';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import React, { FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const historiesFetched = useRecoilValue(historiesFetchedState);
  const histories = useRecoilValue(chatHistoriesState);
  const selectedHistoryId = useRecoilValue(selectedHistoryIdState);

  const onHistoryChange = useRecoilCallback(
    ({ reset, set }) =>
      (historyId: string) => {
        set(selectedHistoryIdState, historyId);
        reset(apiErrorMessageState);
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
                  <ChatBubbleOutlineOutlinedIcon />
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
            sx={{ backgroundColor: selectedHistoryId === history.id ? '#1976d222' : undefined }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ChatBubbleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={history.title} />
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
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0004;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export default StyledComponent;
