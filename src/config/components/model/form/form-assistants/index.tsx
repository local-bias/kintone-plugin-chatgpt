import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  aiIconState,
  assistantDescriptionState,
  assistantNameState,
  assistantsState,
  systemPromptState,
} from '@/config/states/plugin';
import AiModelForm from './ai-model';
import FormText from '@/lib/components/form-text';
import { produce } from 'immer';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TemperatureForm from './temperature';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utility-component';
import DeleteButton from './delete-button';

const Component: FC = () => {
  const removeRow = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(assistantsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    []
  );

  return (
    <div className='px-4 max-w-[900px]'>
      <PluginFormSection>
        <PluginFormTitle>アシスタント名</PluginFormTitle>
        <PluginFormDescription>画面上に表示するアシスタントの名前</PluginFormDescription>
        <PluginFormDescription last>
          ユーザーがどの役割のAIを使用するかを判断するために使用されます。
        </PluginFormDescription>
        <FormText
          state={assistantNameState}
          label='アシスタント名'
          placeholder='ChatGPT'
          width={520}
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>アシスタントの詳細</PluginFormTitle>
        <PluginFormDescription last>
          アシスタントがどういった役割を持っているのか説明文を追加します。
        </PluginFormDescription>
        <FormText
          state={assistantDescriptionState}
          multiline
          rows={4}
          width={520}
          label='アシスタントの説明'
          placeholder='ChatGPTは、OpenAIが提供するAIを使用して、ユーザーとの対話を行うことができます。'
        />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>使用するAIモデル*</PluginFormTitle>
        <div>
          <PluginFormDescription>OpenAIが提供しているAIモデルの設定。</PluginFormDescription>
          <PluginFormDescription>
            使用するモデルによって、発生する料金が変化します。詳細は
            <a href='https://openai.com/pricing'>OpenAIの料金表</a>をご確認ください。
          </PluginFormDescription>
          <PluginFormDescription last>
            <span className='text-red-600'>
              ご契約のプランによっては、一部のモデルを使用することができない場合があります。
            </span>
          </PluginFormDescription>
          <AiModelForm />
        </div>
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>回答のランダム性</PluginFormTitle>
        <PluginFormDescription last>
          数値を大きくするほど、同一の質問に対しても回答が変化します。
        </PluginFormDescription>
        <TemperatureForm />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>AIの役割の設定</PluginFormTitle>
        <PluginFormDescription last>
          このアプリで使用するAIに、予め設定された役割を割り当てることができます。
        </PluginFormDescription>
        <FormText
          state={systemPromptState}
          multiline
          rows={4}
          width={520}
          label='AIの役割'
          placeholder='あなたはITコンサルタントです。質問に対して、ITサービスを活用して適切に解決方法を提案してください。口調はあまり固すぎない敬語で話してください。'
        />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>アイコンの設定</PluginFormTitle>
        <PluginFormDescription last>
          AIが回答した際のアイコンを、設定した画像に変更することができます。
        </PluginFormDescription>
        <FormText state={aiIconState} label='AIのアイコン' width={520} placeholder='https://' />
      </PluginFormSection>

      <DeleteButton />
    </div>
  );
};

export default Component;
