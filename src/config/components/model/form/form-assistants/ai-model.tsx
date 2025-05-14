import { aiModelAtom } from '@/config/states/plugin';
import { OPENAI_MODELS } from '@/lib/static';
import { Autocomplete, TextField } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC } from 'react';

const handleModelChangeAtom = atom(null, (_, set, __: unknown, value: string | null) => {
  if (!value) {
    return;
  }
  set(aiModelAtom, value);
});

const Component: FC = () => {
  const aiModel = useAtomValue(aiModelAtom);
  const onModelChange = useSetAtom(handleModelChangeAtom);

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
