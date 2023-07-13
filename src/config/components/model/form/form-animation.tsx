import { FormControlLabel, Skeleton, Switch } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import styled from '@emotion/styled';
import { enablesAnimationState } from '@/config/states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(enablesAnimationState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(enablesAnimationState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='アニメーションを有効にする'
    />
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
