import {
  enablesAnimationAtom,
  enablesEnterAtom,
  enablesShiftEnterAtom,
} from '@/config/states/plugin';
import { JotaiSwitch } from '@konomi-app/kintone-utilities-jotai';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import { FCX } from 'react';
import ApiKeyForm from './form-api-key';
import LogAppIdForm from './form-log-app-id';
import LogContentForm from './form-log-content';
import LogKeyForm from './form-log-key';
import OutputAppIdForm from './form-output-app-id';
import OutputContentForm from './form-output-content';
import OutputKeyForm from './form-output-key';
import ViewIdState from './form-view-id';
import AiProviderTypeForm from './provider-type';

const Component: FCX = () => {
  return (
    <div className='px-4 max-w-[900px]'>
      <PluginFormSection>
        <PluginFormTitle>APIキー*</PluginFormTitle>
        <div>
          <PluginFormDescription>
            プラグインで使用するAPIキーを入力してください。
          </PluginFormDescription>
          <PluginFormDescription>
            発行手順はAIプロバイダーによって異なるため、各プロバイダーのドキュメントを参照してください。
          </PluginFormDescription>
          <PluginFormDescription last>
            <div>
              OpenAI: <a href='https://platform.openai.com/account/api-keys'>API Keys</a>
            </div>
            <div>
              OpenRouter: <a href='https://openrouter.ai/settings/keys'>API Keys</a>
            </div>
          </PluginFormDescription>
          <AiProviderTypeForm />
          <ApiKeyForm />
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>チャット画面を表示するビューID*</PluginFormTitle>
        <div>
          <PluginFormDescription>AIとの対話を行う一覧。</PluginFormDescription>
          <PluginFormDescription last>
            選択できるのは、表示形式を「カスタマイズ」に設定した一覧のみです。
          </PluginFormDescription>
          <ViewIdState />
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>対話ログ設定(ユーザーによって削除可能)</PluginFormTitle>
        <PluginFormDescription>
          過去行ったAIとのやり取りを記憶するアプリと対象フィールドの設定。
        </PluginFormDescription>
        <PluginFormDescription last>
          ここで設定したデータはユーザーによって画面から削除することができます。
        </PluginFormDescription>
        <div>
          <OutputAppIdForm />
        </div>
        <div className='mt-4'>
          <PluginFormDescription last>
            キー情報は「文字列一行」フィールドのみ選択可能で、「値の重複を禁止する」がチェックされている必要があります。
          </PluginFormDescription>
          <OutputKeyForm />
        </div>
        <div className='mt-4'>
          <OutputContentForm />
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>対話ログ設定(ユーザーによって削除不可)</PluginFormTitle>
        <PluginFormDescription>
          過去行ったAIとのやり取りを記憶するアプリと対象フィールドの設定。
        </PluginFormDescription>
        <PluginFormDescription last>
          ここで設定したデータはユーザーが削除しても残り続けます。
        </PluginFormDescription>
        <div className='mb-4'>
          <LogAppIdForm />
        </div>
        <PluginFormDescription last>
          ログを円滑に更新するために、チャットとログを紐づけるキー情報を格納するフィールドが必要になります。
        </PluginFormDescription>
        <div className='mb-4'>
          <LogKeyForm />
        </div>
        <div>
          <LogContentForm />
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>送信オプション</PluginFormTitle>
        <PluginFormDescription last>
          送信用のショートカットを設定することができます。
        </PluginFormDescription>
        <div className='mb-4'>
          <JotaiSwitch atom={enablesEnterAtom} label='Enterキーで送信' />
        </div>
        <JotaiSwitch atom={enablesShiftEnterAtom} label='Shift + Enterキーで送信' />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>アニメーションの設定</PluginFormTitle>
        <PluginFormDescription last>
          このオプションを有効にすると、AIの返答をアニメーションで表示することができます。
        </PluginFormDescription>
        <JotaiSwitch atom={enablesAnimationAtom} label='アニメーションを有効にする' />
      </PluginFormSection>
    </div>
  );
};

export default Component;
