import {
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
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styled from '@emotion/styled';

const Component: FC = () => {
  const historiesFetched = useRecoilValue(historiesFetchedState);
  const histories = useRecoilValue(chatHistoriesState);
  const selectedHistoryId = useRecoilValue(selectedHistoryIdState);

  const onHistoryChange = useRecoilCallback(
    ({ set }) =>
      (historyId: string) => {
        set(selectedHistoryIdState, historyId);
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
    <div>
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
`;

export default StyledComponent;
