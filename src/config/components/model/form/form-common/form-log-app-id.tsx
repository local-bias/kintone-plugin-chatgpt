import { allKintoneAppsState } from '@/config/states/kintone';
import { logAppIdState, logAppSpaceIdState } from '@/config/states/plugin';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const allApps = useRecoilValue(allKintoneAppsState);
  const appId = useRecoilValue(logAppIdState);

  const onAppChange = useRecoilCallback(
    ({ set }) =>
      (app: kintoneAPI.App | null) => {
        if (!app) {
          return;
        }
        set(logAppIdState, app.appId);
        set(logAppSpaceIdState, app.spaceId ?? undefined);
      },
    []
  );

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
