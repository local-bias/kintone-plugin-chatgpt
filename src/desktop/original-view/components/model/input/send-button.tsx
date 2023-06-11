import { fetchChatCompletion, getHTMLfromMarkdown } from '@/desktop/original-view/action';
import {
  ChatHistory,
  apiErrorMessageState,
  chatHistoriesState,
  chatMessagesState,
  inputTextState,
  pluginConditionState,
  selectedHistoryIdState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import { addRecord, updateRecord } from '@konomi-app/kintone-utilities';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { produce } from 'immer';
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
          const { apiToken, outputAppId, outputContentFieldCode } = condition ?? {};
          if (!apiToken) {
            return;
          }
          const input = await snapshot.getPromise(inputTextState);
          if (input === '') {
            return;
          }
          reset(inputTextState);
          reset(apiErrorMessageState);

          const selectedHistoryId = await snapshot.getPromise(selectedHistoryIdState);
          const histories = await snapshot.getPromise(chatHistoriesState);
          const chatHisory = histories.find((history) => history.id === selectedHistoryId);
          const chatMessages = chatHisory?.messages ?? [];

          const updatedChatMessages: ChatCompletionRequestMessage[] = [
            ...chatMessages,
            { role: 'user', content: input },
          ];
          let historyId = selectedHistoryId;
          if (!selectedHistoryId) {
            if (outputAppId && outputContentFieldCode) {
              const { id } = await addRecord({
                app: outputAppId,
                record: {
                  [outputContentFieldCode]: { value: JSON.stringify(updatedChatMessages) },
                },
              });
              historyId = id;
            } else {
              historyId = new Date().getTime().toString();
            }
            set(selectedHistoryIdState, historyId);
          }
          set(chatHistoriesState, (histories) =>
            produce(histories, (draft) => {
              const history = draft.find((history) => history.id === historyId);
              if (history) {
                history.messages = updatedChatMessages;
              } else {
                draft.unshift({
                  id: historyId!,
                  title: updatedChatMessages[0]?.content ?? historyId!,
                  messages: updatedChatMessages,
                });
              }
            })
          );
          const response = await fetchChatCompletion({
            apiKey: apiToken,
            messages: updatedChatMessages,
          });

          const assistantMessage = response.choices[0].message;
          if (assistantMessage) {
            const mergedChatMessages = [
              ...updatedChatMessages,
              { ...assistantMessage, content: assistantMessage.content },
            ];
            if (outputAppId && outputContentFieldCode) {
              await updateRecord({
                app: outputAppId,
                id: historyId!,
                record: { [outputContentFieldCode]: { value: JSON.stringify(mergedChatMessages) } },
                debug: process.env.NODE_ENV === 'development',
              });
            }
            set(chatHistoriesState, (histories) =>
              produce(histories, (draft) => {
                const history = draft.find((history) => history.id === historyId);
                if (history) {
                  history.messages = mergedChatMessages;
                }
              })
            );
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
