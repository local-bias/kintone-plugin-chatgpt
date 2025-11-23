import { z } from 'zod';
import { ReasoningEffortTypeSchema, VerbosityTypeSchema } from './ai';

const AI_PROVIDER_TYPE_V1 = ['openai', 'openrouter'] as const;
const AiProviderTypeV1Schema = z.enum(AI_PROVIDER_TYPE_V1);

export const AI_PROVIDER_TYPE = AI_PROVIDER_TYPE_V1;
export const AiProviderTypeSchema = AiProviderTypeV1Schema;
export type AiProviderType = z.infer<typeof AiProviderTypeSchema>;

export const PluginConfigV1Schema = z.object({
  version: z.literal(1),
  aiModel: z.string().optional(),
  viewId: z.string(),
  outputAppId: z.string(),
  outputAppSpaceId: z.string().optional(),
  outputKeyFieldCode: z.string(),
  outputContentFieldCode: z.string(),
  logAppId: z.string().optional(),
  logAppSpaceId: z.string().optional(),
  logKeyFieldCode: z.string().optional(),
  logContentFieldCode: z.string().optional(),
  enablesAnimation: z.boolean().optional(),
  aiIcon: z.string().optional(),
  systemPrompt: z.string().optional(),
});
export const PluginConfigV2Schema = z.object({
  version: z.literal(2),
  viewId: z.string(),
  outputAppId: z.string(),
  outputAppSpaceId: z.string().optional(),
  outputKeyFieldCode: z.string(),
  outputContentFieldCode: z.string(),
  logAppId: z.string().optional(),
  logAppSpaceId: z.string().optional(),
  logKeyFieldCode: z.string().optional(),
  logContentFieldCode: z.string().optional(),
  enablesAnimation: z.boolean().optional(),
  assistants: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      aiModel: z.string(),
      aiIcon: z.string(),
      temperature: z.number(),
      systemPrompt: z.string(),
      maxTokens: z.number(),
    })
  ),
});

export const PluginConfigV3Schema = z.object({
  version: z.literal(3),
  viewId: z.string(),
  outputAppId: z.string(),
  outputAppSpaceId: z.string().optional(),
  outputKeyFieldCode: z.string(),
  outputContentFieldCode: z.string(),
  logAppId: z.string().optional(),
  logAppSpaceId: z.string().optional(),
  logKeyFieldCode: z.string().optional(),
  logContentFieldCode: z.string().optional(),
  enablesAnimation: z.boolean(),
  enablesShiftEnter: z.boolean(),
  enablesEnter: z.boolean(),
  assistants: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      aiModel: z.string(),
      aiIcon: z.string(),
      temperature: z.number(),
      systemPrompt: z.string(),
      maxTokens: z.number(),
    })
  ),
});

export const PluginConfigV4Schema = z.object({
  version: z.literal(4),
  viewId: z.string(),
  outputAppId: z.string(),
  outputAppSpaceId: z.string().optional(),
  outputKeyFieldCode: z.string(),
  outputContentFieldCode: z.string(),
  logAppId: z.string().optional(),
  logAppSpaceId: z.string().optional(),
  logKeyFieldCode: z.string().optional(),
  logContentFieldCode: z.string().optional(),
  enablesAnimation: z.boolean(),
  enablesShiftEnter: z.boolean(),
  enablesEnter: z.boolean(),
  assistants: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      aiModel: z.string(),
      aiIcon: z.string(),
      temperature: z.number(),
      systemPrompt: z.string(),
      maxTokens: z.number(),
      examples: z.array(z.string()),
    })
  ),
});

export const PluginConfigV5Schema = z.object({
  version: z.literal(5),
  common: z.object({
    viewId: z.string(),
    outputAppId: z.string(),
    outputAppSpaceId: z.string().optional(),
    outputKeyFieldCode: z.string(),
    outputContentFieldCode: z.string(),
    logAppId: z.string().optional(),
    logAppSpaceId: z.string().optional(),
    logKeyFieldCode: z.string().optional(),
    logContentFieldCode: z.string().optional(),
    enablesAnimation: z.boolean(),
    enablesShiftEnter: z.boolean(),
    enablesEnter: z.boolean(),
  }),
  conditions: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      aiModel: z.string(),
      aiIcon: z.string(),
      temperature: z.number(),
      systemPrompt: z.string(),
      maxTokens: z.number(),
      examples: z.array(z.string()),
    })
  ),
});

export const PluginConditionV6Schema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  aiModel: z.string(),
  aiIcon: z.string(),
  temperature: z.number(),
  systemPrompt: z.string(),
  maxTokens: z.number(),
  examples: z.array(z.string()),
  allowImageUpload: z.boolean(),
});
export const PluginConfigV6Schema = z.object({
  version: z.literal(6),
  common: z.object({
    viewId: z.string(),
    outputAppId: z.string(),
    outputAppSpaceId: z.string().optional(),
    outputKeyFieldCode: z.string(),
    outputContentFieldCode: z.string(),
    logAppId: z.string().optional(),
    logAppSpaceId: z.string().optional(),
    logKeyFieldCode: z.string().optional(),
    logContentFieldCode: z.string().optional(),
    enablesAnimation: z.boolean(),
    enablesShiftEnter: z.boolean(),
    enablesEnter: z.boolean(),
  }),
  conditions: z.array(PluginConditionV6Schema),
});

export const PluginConditionV7Schema = z.object({
  /**
   * プラグイン設定を一意に識別するためのID
   * 設定の並び替えに使用されます
   */
  id: z.string(),
  name: z.string(),
  description: z.string(),
  aiModel: z.string(),
  aiIcon: z.string(),
  temperature: z.number(),
  systemPrompt: z.string(),
  maxTokens: z.number(),
  examples: z.array(z.string()),
  allowImageUpload: z.boolean(),
});
export const PluginConfigV7Schema = z.object({
  version: z.literal(7),
  common: z.object({
    providerType: AiProviderTypeV1Schema,
    viewId: z.string(),
    outputAppId: z.string(),
    outputAppSpaceId: z.string().optional(),
    outputKeyFieldCode: z.string(),
    outputContentFieldCode: z.string(),
    logAppId: z.string().optional(),
    logAppSpaceId: z.string().optional(),
    logKeyFieldCode: z.string().optional(),
    logContentFieldCode: z.string().optional(),
    enablesAnimation: z.boolean(),
    enablesShiftEnter: z.boolean(),
    enablesEnter: z.boolean(),
  }),
  conditions: z.array(PluginConditionV7Schema),
});

export const PluginConditionV8Schema = z.object({
  /**
   * プラグイン設定を一意に識別するためのID
   * 設定の並び替えに使用されます
   */
  id: z.string(),
  name: z.string(),
  description: z.string(),
  aiModel: z.string(),
  aiIcon: z.string(),
  temperature: z.number(),
  systemPrompt: z.string(),
  maxTokens: z.number(),
  examples: z.array(z.string()),
  allowImageUpload: z.boolean(),
  /**
   * どれだけ推論を行うか
   */
  reasoningEffort: ReasoningEffortTypeSchema,
  /**
   * どれだけ詳しく回答するか
   */
  verbosity: VerbosityTypeSchema,
  /**
   * ウェブ検索の利用を許可するかどうか
   */ allowWebSearch: z.boolean(),
  /**
   * OpenAI Prompt API用のプロンプトID (任意)
   */
  promptId: z.string().default(''),
});
export const PluginConfigV8Schema = z.object({
  version: z.literal(8),
  common: z.object({
    providerType: AiProviderTypeV1Schema,
    viewId: z.string(),
    outputAppId: z.string(),
    outputAppSpaceId: z.string().optional(),
    outputKeyFieldCode: z.string(),
    outputContentFieldCode: z.string(),
    logAppId: z.string().optional(),
    logAppSpaceId: z.string().optional(),
    logKeyFieldCode: z.string().optional(),
    logContentFieldCode: z.string().optional(),
    enablesAnimation: z.boolean(),
    enablesShiftEnter: z.boolean(),
    enablesEnter: z.boolean(),
  }),
  conditions: z.array(PluginConditionV8Schema),
});

export const PluginConfigV9Schema = z.object({
  version: z.literal(9),
  common: z.object({
    providerType: AiProviderTypeV1Schema,
    viewId: z.string(),
    outputAppId: z.string(),
    outputAppSpaceId: z.string().optional(),
    outputKeyFieldCode: z.string(),
    outputContentFieldCode: z.string(),
    logAppId: z.string().optional(),
    logAppSpaceId: z.string().optional(),
    logKeyFieldCode: z.string().optional(),
    logContentFieldCode: z.string().optional(),
    // Log App バージョン選択
    logAppVersion: z.enum(['v1', 'v2']).default('v1'),
    // Log App V2設定
    logAppV2SessionIdFieldCode: z.string().optional(),
    logAppV2AssistantIdFieldCode: z.string().optional(),
    logAppV2RoleFieldCode: z.string().optional(),
    logAppV2ContentFieldCode: z.string().optional(),
    enablesAnimation: z.boolean(),
    enablesShiftEnter: z.boolean(),
    enablesEnter: z.boolean(),
  }),
  conditions: z.array(PluginConditionV8Schema),
});

export const AnyPluginConfigSchema = z.discriminatedUnion('version', [
  PluginConfigV1Schema,
  PluginConfigV2Schema,
  PluginConfigV3Schema,
  PluginConfigV4Schema,
  PluginConfigV5Schema,
  PluginConfigV6Schema,
  PluginConfigV7Schema,
  PluginConfigV8Schema,
  PluginConfigV9Schema,
]);

/** 🔌 プラグインがアプリ単位で保存する設定情報 */
export type PluginConfig = z.infer<typeof PluginConfigV9Schema>;

export const LatestPluginConditionSchema = PluginConditionV8Schema;

/** 🔌 プラグインの共通設定 */
export type PluginCommonConfig = PluginConfig['common'];

/** 🔌 プラグインの詳細設定 */
export type PluginCondition = PluginConfig['conditions'][number];

/** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
export type AnyPluginConfig = z.infer<typeof AnyPluginConfigSchema>;
