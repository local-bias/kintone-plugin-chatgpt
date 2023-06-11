import { fetchChatCompletion, getHTMLfromMarkdown } from '@/desktop/original-view/action';
import {
  apiErrorMessageState,
  chatMessagesState,
  inputTextState,
  pluginConditionState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { ChatCompletionRequestMessage } from 'openai';
import React, { FC, FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FCX = ({ className }) => {
  const input = useRecoilValue(inputTextState);
  const waitingForResponse = useRecoilValue(waitingForResponseState);

  const onClick = useRecoilCallback(
    ({ set, snapshot, reset }) =>
      async () => {
        try {
          set(waitingForResponseState, true);
          const condition = await snapshot.getPromise(pluginConditionState);
          const { apiToken } = condition ?? {};
          if (!apiToken) {
            return;
          }
          const input = await snapshot.getPromise(inputTextState);
          if (input === '') {
            return;
          }
          reset(inputTextState);
          reset(apiErrorMessageState);
          const chatMessages = await snapshot.getPromise(chatMessagesState);
          const updatedChatMessages: ChatCompletionRequestMessage[] = [
            ...chatMessages,
            { role: 'user', content: getHTMLfromMarkdown(input) },
          ];
          set(chatMessagesState, updatedChatMessages);
          const response = await fetchChatCompletion({
            apiKey: apiToken,
            messages: updatedChatMessages,
          });

          const assistantMessage = response.choices[0].message;
          if (assistantMessage) {
            set(chatMessagesState, (messages) => [
              ...messages,
              {
                ...assistantMessage,
                content: getHTMLfromMarkdown(assistantMessage.content),
              },
            ]);
          }
        } catch (error: any) {
          if (error instanceof Error) {
            set(apiErrorMessageState, error.message);
            console.error(error.message);
          } else {
            set(apiErrorMessageState, '不明なエラーが発生しました');
          }
        } finally {
          set(waitingForResponseState, false);
        }
      },
    []
  );

  return (
    <div className={className}>
      <div></div>
      <Button
        variant='contained'
        color='primary'
        startIcon={<SendIcon />}
        disabled={waitingForResponse || input === ''}
        onClick={onClick}
      >
        送信
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: space-between;
`;

export default StyledComponent;
