import {
  apiKeyState,
  enablesAnimationState,
  enablesEnterState,
  enablesShiftEnterState,
} from '@/config/states/plugin';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
  RecoilSwitch,
  RecoilText,
} from '@konomi-app/kintone-utilities-react';
import React, { FCX } from 'react';
import LogAppIdForm from './form-log-app-id';
import LogContentForm from './form-log-content';
import LogKeyForm from './form-log-key';
import OutputAppIdForm from './form-output-app-id';
import OutputContentForm from './form-output-content';
import OutputKeyForm from './form-output-key';
import ViewIdState from './form-view-id';

const Component: FCX = () => {
  return (
    <div className='px-4 max-w-[900px]'>
      <PluginFormSection>
        <PluginFormTitle>ChatGPTのAPIキー*</PluginFormTitle>
        <div>
          <PluginFormDescription>OpenAI Platformで発行したAPIキー。</PluginFormDescription>
          <PluginFormDescription last>
            キーの発行は<a href='https://platform.openai.com/account/api-keys'>こちらから</a>
            可能です。
          </PluginFormDescription>
          <RecoilText
            state={apiKeyState}
            variant='outlined'
            label='APIキー'
            placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            width={510}
          />
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
          <RecoilSwitch state={enablesEnterState} label='Enterキーで送信' />
        </div>
        <RecoilSwitch state={enablesShiftEnterState} label='Shift + Enterキーで送信' />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>アニメーションの設定</PluginFormTitle>
        <PluginFormDescription last>
          このオプションを有効にすると、AIの返答をアニメーションで表示することができます。
        </PluginFormDescription>
        <RecoilSwitch state={enablesAnimationState} label='アニメーションを有効にする' />
      </PluginFormSection>
    </div>
  );
};

export default Component;
