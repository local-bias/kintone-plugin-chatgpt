import React, { FC } from 'react';
import {
  aiIconAtom,
  allowImageUploadAtom,
  assistantDescriptionAtom,
  assistantNameAtom,
  maxTokensAtom,
  systemPromptAtom,
} from '@/config/states/plugin';
import AiModelForm from './ai-model';
import TemperatureForm from './temperature';
import ExamplesForm from './examples';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import DeleteButton from './condition-delete-button';
import { JotaiSwitch, JotaiText } from '@konomi-app/kintone-utilities-jotai';

const Component: FC = () => {
  return (
    <div className='px-4 max-w-content'>
      <PluginFormSection>
        <PluginFormTitle>アシスタント名</PluginFormTitle>
        <PluginFormDescription>画面上に表示するアシスタントの名前</PluginFormDescription>
        <PluginFormDescription last>
          ユーザーがどの役割のAIを使用するかを判断するために使用されます。
        </PluginFormDescription>
        <JotaiText
          atom={assistantNameAtom}
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
        <JotaiText
          atom={assistantDescriptionAtom}
          multiline
          fullWidth
          sx={{ width: '100%' }}
          rows={4}
          label='アシスタントの説明'
          placeholder='ChatGPTは、OpenAIが提供するAIを使用して、ユーザーとの対話を行うことができます。'
        />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>使用するAIモデル*</PluginFormTitle>
        <div>
          <PluginFormDescription>
            AIプロバイダーが提供しているAIモデルの設定。使用するモデルによって、発生する料金が変化します。詳細は
            <a href='https://openai.com/pricing' target='_blank' rel='noopener noreferrer'>
              OpenAIの料金表
            </a>
            もしくは
            <a href='https://openrouter.ai/models' target='_blank' rel='noopener noreferrer'>
              OpenRouterのモデル一覧
            </a>
            をご確認ください。
          </PluginFormDescription>
          <PluginFormDescription>
            ファインチューニングされたモデルをお持ちの場合や、選択肢にないモデルを使用されたい場合は、直接入力することで使用することができます。
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
        <JotaiText
          atom={systemPromptAtom}
          multiline
          rows={6}
          sx={{ width: '100%' }}
          fullWidth
          label='AIの役割'
          placeholder='あなたはITコンサルタントです。質問に対して、ITサービスを活用して適切に解決方法を提案してください。口調はあまり固すぎない敬語で話してください。'
        />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>アイコンの設定</PluginFormTitle>
        <PluginFormDescription last>
          AIが回答した際のアイコンを、設定した画像に変更することができます。
        </PluginFormDescription>
        <JotaiText atom={aiIconAtom} label='AIのアイコン' width={520} placeholder='https://' />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>画像読み込み</PluginFormTitle>
        <PluginFormDescription>
          このアシスタントにテキストに加えて、画像の読み取りを許可するかどうかを設定します。
        </PluginFormDescription>
        <PluginFormDescription last>
          <span className='text-red-600'>
            使用するAIモデルによっては、この設定を有効にしても画像の読み取りができない場合があります。
          </span>
          AIモデル毎の対応状況は、
          <a
            href='https://platform.openai.com/docs/models'
            target='_blank'
            rel='noopener noreferrer'
          >
            OpenAIのドキュメント
          </a>
          をご確認ください。
        </PluginFormDescription>
        <JotaiSwitch atom={allowImageUploadAtom} label='画像の読み込みを有効にする' />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>返答の長さの最大値</PluginFormTitle>
        <PluginFormDescription>AIが返答する文章の最大の長さを設定します。</PluginFormDescription>
        <PluginFormDescription>
          この設定を有効にすると、指定されたトークン数に達した時点で返答を終了します。
        </PluginFormDescription>
        <PluginFormDescription>
          少なすぎる数値を設定すると、文章が不完全な状態で返答される可能性があります。
        </PluginFormDescription>
        <PluginFormDescription>0を設定した場合、モデルの設定に従います。</PluginFormDescription>
        <PluginFormDescription last>
          文字列の長さにはトークンという独自の単位が使用されています。詳細は
          <a href='https://platform.openai.com/tokenizer' target='_blank' rel='noopener noreferrer'>
            OpenAIのドキュメント
          </a>
          をご確認ください。
        </PluginFormDescription>
        {/* @ts-ignore */}
        <JotaiText type='number' atom={maxTokensAtom} label='返答の長さの最大値' width={200} />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>例文の設定</PluginFormTitle>
        <PluginFormDescription>
          このアシスタントに対してサンプルとなる文章を設定することができます。
        </PluginFormDescription>
        <PluginFormDescription last>
          入力欄の上部に表示され、クリックすることで入力欄に自動で入力されます。
        </PluginFormDescription>
        <ExamplesForm />
      </PluginFormSection>

      <DeleteButton />
    </div>
  );
};

export default Component;
