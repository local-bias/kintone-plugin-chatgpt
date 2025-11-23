import { logAppVersionAtom } from '@/config/states/plugin';
import { PluginFormDescription, PluginFormTitle } from '@konomi-app/kintone-utilities-react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useAtom } from 'jotai';

export default function FormLogVersion() {
  const [logAppVersion, setLogAppVersion] = useAtom(logAppVersionAtom);

  return (
    <>
      <PluginFormTitle>ログアプリのバージョン</PluginFormTitle>
      <PluginFormDescription>
        ログアプリの保存形式を選択してください。V1は従来の形式(1対話セッション=1レコード)、V2は新形式(1メッセージ=1レコード)です。
      </PluginFormDescription>
      <PluginFormDescription last>
        V2を選択した場合、下記のフィールドマッピング設定が必要です。
      </PluginFormDescription>
      <FormControl>
        <RadioGroup
          value={logAppVersion ?? 'v1'}
          onChange={(e) => setLogAppVersion(e.target.value as 'v1' | 'v2')}
        >
          <FormControlLabel value='v1' control={<Radio />} label='V1 (従来形式)' />
          <FormControlLabel value='v2' control={<Radio />} label='V2 (新形式)' />
        </RadioGroup>
      </FormControl>
    </>
  );
}
