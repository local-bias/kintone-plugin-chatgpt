import React, { FC } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { OPENAI_MODELS } from '@/lib/static';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { aiModelState } from '@/config/states/plugin';

type Props = {
  aiModel: string;
  onModelChange: (event: any, value: string | null) => void;
};

const Component: FC<Props> = ({ aiModel, onModelChange }) => (
  <Autocomplete
    value={aiModel}
    sx={{ width: '350px' }}
    options={OPENAI_MODELS}
    getOptionLabel={(option) => option}
    onChange={onModelChange}
    renderInput={(params) => (
      <TextField {...params} label='モデル名' variant='outlined' color='primary' />
    )}
  />
);

const Container: FC = () => {
  const aiModel = useRecoilValue(aiModelState);

  const onModelChange = useRecoilCallback(
    ({ set }) =>
      (_: any, model: string | null) => {
        if (!model) {
          return;
        }
        set(aiModelState, model);
      },
    []
  );

  return <Component aiModel={aiModel} onModelChange={onModelChange} />;
};

export default Container;
