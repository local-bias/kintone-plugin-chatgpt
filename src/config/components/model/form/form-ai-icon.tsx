import { Skeleton, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { aiIconState, apiKeyState } from '../../../states/plugin';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const apiToken = useRecoilValue(aiIconState);

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(aiIconState, event.target.value);
      },
    []
  );

  return (
    <div className={className}>
      <TextField
        variant='outlined'
        label='アイコンのURL'
        value={apiToken}
        onChange={onFieldChange}
        placeholder='https://example.com/icon.png'
      />
    </div>
  );
};

const StyledComponent = styled(Component)`
  > div {
    width: 510px;
  }
`;

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton width={510} height={56} />}>
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
