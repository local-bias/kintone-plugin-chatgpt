import { reasoningEffortAtom } from '@/config/states/plugin';
import { MenuItem, TextField } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent, FC } from 'react';

const REASONING_EFFORT_OPTIONS = [
  { value: 'minimal', label: 'Minimal - 最小限' },
  { value: 'low', label: 'Low - 低' },
  { value: 'medium', label: 'Medium - 中' },
  { value: 'high', label: 'High - 高' },
] as const;

const handleReasoningEffortChangeAtom = atom(
  null,
  (_, set, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'minimal' | 'low' | 'medium' | 'high';
    set(reasoningEffortAtom, value);
  }
);

const Component: FC = () => {
  const reasoningEffort = useAtomValue(reasoningEffortAtom);
  const onChange = useSetAtom(handleReasoningEffortChangeAtom);

  return (
    <TextField
      select
      label='推論レベル'
      value={reasoningEffort}
      onChange={onChange}
      sx={{ width: 300 }}
    >
      {REASONING_EFFORT_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Component;
