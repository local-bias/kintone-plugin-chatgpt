import { pluginCommonConfigAtom } from '@/desktop/public-state';
import { addRecord, upsertRecord, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { selectedHistoryAtom } from './states';

type UpdateAppParams = {
  appId: string;
  keyFieldCode: string;
  contentFieldCode: string;
  spaceId?: string;
};

const handleUpdateAppAtom = atom(null, async (get, _, params: UpdateAppParams) => {
  const { appId, keyFieldCode, contentFieldCode, spaceId } = params;
  const selectedHistory = get(selectedHistoryAtom);
  if (!selectedHistory) {
    throw new Error('チャットが選択されていません');
  }

  await withSpaceIdFallback({
    spaceId,
    func: upsertRecord,
    funcParams: {
      app: appId,
      updateKey: {
        field: keyFieldCode,
        value: selectedHistory.id,
      },
      record: {
        [keyFieldCode]: { value: selectedHistory.id },
        [contentFieldCode]: { value: JSON.stringify(selectedHistory) },
      },
      debug: process.env.NODE_ENV === 'development',
    },
  });
});

export const handleUpdateOutputAppAtom = atom(null, async (get, set) => {
  const common = get(pluginCommonConfigAtom);

  const {
    outputAppId: appId,
    outputAppSpaceId: spaceId,
    outputContentFieldCode: contentFieldCode,
    outputKeyFieldCode: keyFieldCode,
  } = common;

  if (!appId || !contentFieldCode || !keyFieldCode) {
    process.env.NODE_ENV === 'development' && console.warn('Content app is not configured');
    return;
  }

  await set(handleUpdateAppAtom, { appId, keyFieldCode, contentFieldCode, spaceId });
});

const handleUpdateLogAppV1Atom = atom(null, async (get, set) => {
  const common = get(pluginCommonConfigAtom);

  const {
    logAppId: appId,
    logAppSpaceId: spaceId,
    logContentFieldCode: contentFieldCode,
    logKeyFieldCode: keyFieldCode,
  } = common;

  if (!appId || !contentFieldCode || !keyFieldCode) {
    process.env.NODE_ENV === 'development' && console.warn('Log app is not configured');
    return;
  }

  await set(handleUpdateAppAtom, { appId, keyFieldCode, contentFieldCode, spaceId });
});

const handleUpdateLogAppV2Atom = atom(null, async (get) => {
  const common = get(pluginCommonConfigAtom);
  const selectedHistory = get(selectedHistoryAtom);

  if (!selectedHistory) {
    process.env.NODE_ENV === 'development' && console.warn('No chat history selected');
    return;
  }

  const {
    logAppId,
    logAppSpaceId,
    logAppV2SessionIdFieldCode,
    logAppV2AssistantIdFieldCode,
    logAppV2RoleFieldCode,
    logAppV2ContentFieldCode,
  } = common;

  if (
    !logAppId ||
    !logAppV2SessionIdFieldCode ||
    !logAppV2RoleFieldCode ||
    !logAppV2ContentFieldCode
  ) {
    process.env.NODE_ENV === 'development' && console.warn('Log app V2 is not properly configured');
    return;
  }

  // 最新メッセージを取得
  const latestMessage = selectedHistory.messages[selectedHistory.messages.length - 1];
  if (!latestMessage) {
    return;
  }

  const record: Record<string, { value: string; }> = {
    [logAppV2SessionIdFieldCode]: { value: selectedHistory.id },
    [logAppV2RoleFieldCode]: { value: latestMessage.role },
    [logAppV2ContentFieldCode]: {
      value:
        typeof latestMessage.content === 'string'
          ? latestMessage.content
          : JSON.stringify(latestMessage.content),
    },
  };

  if (logAppV2AssistantIdFieldCode) {
    record[logAppV2AssistantIdFieldCode] = { value: selectedHistory.assistantId };
  }

  withSpaceIdFallback({
    spaceId: logAppSpaceId,
    func: addRecord,
    funcParams: {
      app: logAppId,
      record,
      debug: process.env.NODE_ENV === 'development',
    },
  });
});

export const handleUpdateLogAppAtom = atom(null, async (get, set) => {
  const common = get(pluginCommonConfigAtom);
  const { logAppVersion } = common;

  if (logAppVersion === 'v2') {
    await set(handleUpdateLogAppV2Atom);
  } else {
    await set(handleUpdateLogAppV1Atom);
  }
});
