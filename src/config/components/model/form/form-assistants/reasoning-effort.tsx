import { reasoningEffortAtom } from '@/config/states/plugin';
import { ReasoningEffortType } from '@/schema/ai';
import { MenuItem, TextField } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';

const REASONING_EFFORT_OPTIONS = [
  { value: 'model-default', label: 'Model Default - モデルデフォルト' },
  { value: 'none', label: 'None - なし' },
  { value: 'minimal', label: 'Minimal - 最小限' },
  { value: 'low', label: 'Low - 低' },
  { value: 'medium', label: 'Medium - 中' },
  { value: 'high', label: 'High - 高' },
] as const satisfies { value: ReasoningEffortType; label: string }[];

const handleReasoningEffortChangeAtom = atom(
  null,
  (_, set, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ReasoningEffortType;
    set(reasoningEffortAtom, value);
  }
);

export default function ReasoningEffort() {
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
}
