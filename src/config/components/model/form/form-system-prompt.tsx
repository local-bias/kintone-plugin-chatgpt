import { Skeleton, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { systemPromptState } from '../../../states/plugin';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const systemPrompt = useRecoilValue(systemPromptState);

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(systemPromptState, event.target.value);
      },
    []
  );

  return (
    <div className={className}>
      <TextField
        multiline
        rows={4}
        variant='outlined'
        label='AIの役割'
        value={systemPrompt}
        onChange={onFieldChange}
        placeholder='あなたはITコンサルタントです。質問に対して、ITサービスを活用して適切に解決方法を提案してください。口調はあまり固すぎない敬語で話してください。'
      />
    </div>
  );
};

const StyledComponent = styled(Component)`
  > div {
    width: 660px;
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
