import { allKintoneAppsState } from '@/config/states/kintone';
import { outputAppIdState } from '@/config/states/plugin';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FCX = () => {
  const allApps = useRecoilValue(allKintoneAppsState);
  const appId = useRecoilValue(outputAppIdState);

  const onAppChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(outputAppIdState, value);
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
      onChange={(_, app) => onAppChange(app?.appId ?? '')}
      renderInput={(params) => (
        <TextField {...params} label='アプリID' variant='outlined' color='primary' />
      )}
    />
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton width={350} height={56} />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
