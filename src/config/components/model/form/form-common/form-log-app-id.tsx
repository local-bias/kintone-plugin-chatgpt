import { allKintoneAppsState } from '@/config/states/kintone';
import { logAppIdAtom, logAppSpaceIdAtom } from '@/config/states/plugin';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC, memo, Suspense } from 'react';

const handleAppChangeAtom = atom(null, (_, set, app: kintoneAPI.App | null) => {
  if (!app) {
    return;
  }
  set(logAppIdAtom, app.appId);
  set(logAppSpaceIdAtom, app.spaceId ?? undefined);
});

const Component: FC = () => {
  const allApps = useAtomValue(allKintoneAppsState);
  const appId = useAtomValue(logAppIdAtom);
  const onAppChange = useSetAtom(handleAppChangeAtom);

  return (
    <Autocomplete
      value={allApps.find((app) => app.appId === appId) ?? null}
      sx={{ width: '350px' }}
      options={allApps}
      isOptionEqualToValue={(option, v) => option.appId === v.appId}
      getOptionLabel={(app) => `${app.name}(id: ${app.appId})`}
      onChange={(_, app) => onAppChange(app)}
      renderInput={(params) => (
        <TextField {...params} label='アプリID' variant='outlined' color='primary' />
      )}
    />
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
