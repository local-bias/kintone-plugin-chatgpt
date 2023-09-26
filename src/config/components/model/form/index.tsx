import { aiIconState, apiKeyState, enablesAnimationState } from '@/config/states/plugin';
import { FormSwitch } from '@/lib/components/form-switch';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utility-component';
import React, { FCX } from 'react';
import AIModelForm from './form-ai-model';
import LogAppIdForm from './form-log-app-id';
import LogContentForm from './form-log-content';
import LogKeyForm from './form-log-key';
import OutputAppIdForm from './form-output-app-id';
import OutputContentForm from './form-output-content';
import OutputKeyForm from './form-output-key';
import SystemPromptForm from './form-system-prompt';
import ViewIdState from './form-view-id';
import FormText from '@/lib/components/form-text';

const Component: FCX = () => {
  return (
    <div className='text-sm px-4 max-w-[800px]'>
      <PluginFormSection>
        <PluginFormTitle>ChatGPTのAPIキー*</PluginFormTitle>
        <div>
          <PluginFormDescription>OpenAI Platformで発行したAPIキー。</PluginFormDescription>
          <PluginFormDescription last>
            キーの発行は<a href='https://platform.openai.com/account/api-keys'>こちらから</a>
            可能です。
          </PluginFormDescription>
          <FormText
            state={apiKeyState}
            variant='outlined'
            label='APIキー'
            placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            width={510}
          />
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>使用するAIモデル*</PluginFormTitle>
        <div>
          <PluginFormDescription>OpenAIが提供しているAIモデルの設定。</PluginFormDescription>
          <PluginFormDescription last>
            使用するモデルによって、発生する料金が変化します。詳細は
            <a href='https://openai.com/pricing'>OpenAIの料金表</a>をご確認ください。
          </PluginFormDescription>
          <AIModelForm />
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
        <PluginFormTitle>AIの役割の設定</PluginFormTitle>
        <PluginFormDescription last>
          このアプリで使用するAIに、予め設定された役割を割り当てることができます。
        </PluginFormDescription>
        <SystemPromptForm />
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
        <PluginFormTitle>アニメーションの設定</PluginFormTitle>
        <PluginFormDescription last>
          このオプションを有効にすると、AIの返答をアニメーションで表示することができます。
        </PluginFormDescription>
        <FormSwitch state={enablesAnimationState} label='アニメーションを有効にする' />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>アイコンの設定</PluginFormTitle>
        <PluginFormDescription last>
          AIが回答した際のアイコンを、設定した画像に変更することができます。
        </PluginFormDescription>
        <FormText
          state={aiIconState}
          variant='outlined'
          label='アイコンのURL'
          placeholder='https://example.com/icon.png'
        />
      </PluginFormSection>
    </div>
  );
};

export default Component;
