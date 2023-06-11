import { getAllRecords, kintoneAPI } from '@konomi-app/kintone-utilities';
import { ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum } from 'openai';
import { atom, selector } from 'recoil';

const PREFIX = 'kintone';

export const pluginConditionState = atom<kintone.plugin.Condition | null>({
  key: `${PREFIX}pluginConditionState`,
  default: null,
});

export const inputTextState = atom<string>({
  key: `${PREFIX}inputTextState`,
  default: '',
});

export const waitingForResponseState = atom<boolean>({
  key: `${PREFIX}waitingForResponseState`,
  default: false,
});

export const chatMessagesState = atom<ChatCompletionRequestMessage[]>({
  key: `${PREFIX}chatMessagesState`,
  default: [],
});

export const chatHistoryRecordsState = atom<kintoneAPI.RecordData[]>({
  key: `${PREFIX}chatHistoriesState`,
  default: [],
});

export const apiErrorMessageState = atom<string>({
  key: `${PREFIX}apiErrorMessageState`,
  default: '',
});
