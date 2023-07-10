import { fetchChatCompletion } from '@/desktop/original-view/action';
import {
  ChatMessage,
  apiErrorMessageState,
  chatHistoriesState,
  inputTextState,
  pluginConfigState,
  selectedHistoryIdState,
  waitingForResponseState,
} from '@/desktop/original-view/states/states';
import { OPENAI_MODELS } from '@/lib/static';
import styled from '@emotion/styled';
import { addRecord, updateRecord, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { produce } from 'immer';
import { ChatCompletionRequestMessage } from 'openai';
import React, { FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FCX = ({ className }) => {
  const input = useRecoilValue(inputTextState);
  const waitingForResponse = useRecoilValue(waitingForResponseState);

  const onClick = useRecoilCallback(
    ({ set, snapshot, reset }) =>
      async () => {
        try {
          set(waitingForResponseState, true);
          const config = await snapshot.getPromise(pluginConfigState);
          const {
            aiModel = OPENAI_MODELS[0],
            outputAppId,
            outputAppSpaceId,
            outputContentFieldCode,
            logAppId,
            logAppSpaceId,
            logContentFieldCode,
          } = config ?? {};
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

          const updatedChatMessages: ChatMessage[] = [
            ...chatMessages,
            { role: 'user', content: input },
          ];
          let historyId = selectedHistoryId;
          if (!selectedHistoryId) {
            if (outputAppId && outputContentFieldCode) {
              const { id } = await withSpaceIdFallback({
                spaceId: outputAppSpaceId,
                func: addRecord,
                funcParams: {
                  app: outputAppId,
                  record: {
                    [outputContentFieldCode]: { value: JSON.stringify(updatedChatMessages) },
                  },
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
                  /**@ts-ignore */
                  title: updatedChatMessages[0]?.content.slice(0, 8) ?? historyId!,
                  messages: updatedChatMessages,
                });
              }
            })
          );
          const response = await fetchChatCompletion({
            model: aiModel,
            messages: updatedChatMessages,
          });

          const assistantMessage = response.choices[0].message;
          if (assistantMessage) {
            const mergedChatMessages: ChatMessage[] = [
              ...updatedChatMessages,
              { role: assistantMessage.role, content: assistantMessage.content ?? '' },
            ];
            if (outputAppId && outputContentFieldCode) {
              await withSpaceIdFallback({
                spaceId: outputAppSpaceId,
                func: updateRecord,
                funcParams: {
                  app: outputAppId,
                  id: historyId!,
                  record: {
                    [outputContentFieldCode]: { value: JSON.stringify(mergedChatMessages) },
                  },
                  debug: process.env.NODE_ENV === 'development',
                },
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
