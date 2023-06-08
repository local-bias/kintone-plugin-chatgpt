import React, { ChangeEventHandler, FC, FCX, memo, Suspense } from 'react';
import styled from '@emotion/styled';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { customViewsState } from '@/config/states/kintone';
import { viewIdState } from '@/config/states/plugin';

const Input: FC = () => {
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(viewIdState, e.target.value);
      },
    []
  );

  return (
    <TextField select label='一覧の名前' value={viewId} {...{ onChange }}>
      {Object.entries(views).map(([name, { id }], i) => (
        <MenuItem key={i} value={id}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <Suspense fallback={<Skeleton width={350} height={56} />}>
        <Input />
      </Suspense>
      <small>選択できる一覧の表示形式は「カスタマイズ」のみです</small>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  small {
    color: #ffb347;
  }

  & > div {
    width: 250px;
  }
`;

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton width={250} height={56} />}>
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
