import { openaiApiKeyAtom, openrouterApiKeyAtom, providerTypeAtom } from '@/config/states/plugin';
import { JotaiText } from '@konomi-app/kintone-utilities-jotai';
import { useAtomValue } from 'jotai';

export default function ApiKeyForm() {
  const providerType = useAtomValue(providerTypeAtom);

  const atom = providerType === 'openai' ? openaiApiKeyAtom : openrouterApiKeyAtom;

  return (
    <JotaiText
      atom={atom}
      type='password'
      variant='outlined'
      label='APIキー'
      placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      width={510}
    />
  );
}
