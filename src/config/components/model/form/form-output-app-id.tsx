import { allKintoneAppsState } from '@/config/states/kintone';
import { outputAppIdState, outputAppSpaceIdState } from '@/config/states/plugin';
import { App } from '@kintone/rest-api-client/lib/src/client/types';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FCX = () => {
  const allApps = useRecoilValue(allKintoneAppsState);
  const appId = useRecoilValue(outputAppIdState);

  const onAppChange = useRecoilCallback(
    ({ set }) =>
      (app: App | null) => {
        if (!app) {
          return;
        }
        set(outputAppIdState, app.appId);
        set(outputAppSpaceIdState, app.spaceId ?? undefined);
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
