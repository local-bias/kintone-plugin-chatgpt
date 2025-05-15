import { providerTypeAtom } from '@/config/states/plugin';
import { AiProviderType } from '@/schema/plugin-config';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const AiProviderTypeOptions: {
  value: AiProviderType;
  label: string;
}[] = [
  {
    value: 'openrouter',
    label: 'OpenRouter',
  },
  {
    value: 'openai',
    label: 'OpenAI',
  },
];

const handleValueChangeAtom = atom(null, (_, set, _event: unknown, newValue: string) => {
  set(providerTypeAtom, newValue as AiProviderType);
});

function AiProviderTypeFormComponent() {
  const providerType = useAtomValue(providerTypeAtom);
  const onChange = useSetAtom(handleValueChangeAtom);

  return (
    <RadioGroup row value={providerType} onChange={onChange}>
      {AiProviderTypeOptions.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
}

export default function AiProviderTypeForm() {
  return (
    <div className='mb-4'>
      <div className='mb-2 text-sm font-bold'>使用するAIプロバイダー</div>
      <AiProviderTypeFormComponent />
    </div>
  );
}
