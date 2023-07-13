import React, { FCX } from 'react';
import styled from '@emotion/styled';
import APITokenForm from './form-api-key';
import ViewIdState from './form-view-id';
import OutputAppIdForm from './form-output-app-id';
import OutputContentForm from './form-output-content';
import LogAppIdForm from './form-log-app-id';
import LogContentForm from './form-log-content';
import LogKeyForm from './form-log-key';
import AIModelForm from './form-ai-model';
import AnimationForm from './form-animation';
import AiIconForm from './form-ai-icon';
import {
  PluginFormTitle,
  PluginFormDescription,
  PluginFormSection,
} from '@konomi-app/kintone-utility-component';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <PluginFormSection>
        <PluginFormTitle>ChatGPTのAPIキー*</PluginFormTitle>
        <div>
          <PluginFormDescription>OpenAI Platformで発行したAPIキー。</PluginFormDescription>
          <PluginFormDescription last>
            キーの発行は<a href='https://platform.openai.com/account/api-keys'>こちらから</a>
            可能です。
          </PluginFormDescription>
          <APITokenForm />
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
        <div style={{ marginTop: '16px' }}>
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
        <div style={{ marginBottom: '16px' }}>
          <LogAppIdForm />
        </div>
        <PluginFormDescription last>
          ログを円滑に更新するために、チャットとログを紐づけるキー情報を格納するフィールドが必要になります。
        </PluginFormDescription>
        <div style={{ marginBottom: '16px' }}>
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
        <AnimationForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>アイコンの設定</PluginFormTitle>
        <PluginFormDescription last>
          AIが回答した際のアイコンを、設定した画像に変更することができます。
        </PluginFormDescription>
        <AiIconForm />
      </PluginFormSection>
    </div>
  );
};

const StyledComponent = styled(Component)`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
  font-size: 14px;
`;

export default StyledComponent;
