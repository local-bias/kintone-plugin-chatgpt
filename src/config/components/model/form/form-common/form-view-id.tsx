import { customViewsState } from '@/config/states/kintone';
import { viewIdAtom } from '@/config/states/plugin';
import styled from '@emotion/styled';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent, FC, FCX, memo, Suspense } from 'react';

const handleViewIdChangeAtom = atom(null, (_, set, event: ChangeEvent<HTMLInputElement>) => {
  set(viewIdAtom, event.target.value);
});

const Input: FC = () => {
  const views = useAtomValue(customViewsState);
  const viewId = useAtomValue(viewIdAtom);
  const onChange = useSetAtom(handleViewIdChangeAtom);

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
      <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
        <Input />
      </Suspense>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

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
