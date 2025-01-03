import React, { FC } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { OPENAI_MODELS } from '@/lib/static';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { getConditionPropertyState } from '@/config/states/plugin';

const Component: FC = () => {
  const aiModel = useRecoilValue(getConditionPropertyState('aiModel'));

  const onModelChange = useRecoilCallback(
    ({ set }) =>
      (_: any, model: string | null) => {
        if (!model) {
          return;
        }
        set(getConditionPropertyState('aiModel'), model);
      },
    []
  );

  return (
    <Autocomplete
      value={aiModel}
      freeSolo
      sx={{ width: '350px' }}
      options={OPENAI_MODELS}
      getOptionLabel={(option) => option}
      onChange={onModelChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label='モデル名'
          onChange={(e) => onModelChange(null, e.target.value)}
          variant='outlined'
          color='primary'
        />
      )}
    />
  );
};

const Container: FC = () => {
  return <Component />;
};

export default Container;
