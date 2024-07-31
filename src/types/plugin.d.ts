declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV5;

  /** 🔌 プラグインの共通設定 */
  type Common = Config['common'];

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2 | ConfigV3 | ConfigV4 | ConfigV5;

  type AiAssistantPropsV2 = {
    name: string;
    description: string;
    aiModel: string;
    aiIcon: string;
    temperature: number;
    systemPrompt: string;
    maxTokens: number;
    examples: string[];
  };

  type AiAssistantPropsV1 = {
    name: string;
    description: string;
    aiModel: string;
    aiIcon: string;
    temperature: number;
    systemPrompt: string;
    maxTokens: number;
  };

  type ConfigV5 = {
    version: 5;
    common: Omit<ConfigV4, 'version' | 'assistants'>;
    conditions: (ConfigV4['assistants'][number] & { id: string })[];
  };

  type ConfigV4 = {
    version: 4;
    viewId: string;
    outputAppId: string;
    outputAppSpaceId?: string;
    outputKeyFieldCode: string;
    outputContentFieldCode: string;
    logAppId?: string;
    logAppSpaceId?: string;
    logKeyFieldCode?: string;
    logContentFieldCode?: string;
    enablesAnimation: boolean;
    enablesShiftEnter: boolean;
    enablesEnter: boolean;
    assistants: AiAssistantPropsV2[];
  };

  type ConfigV3 = {
    version: 3;
    viewId: string;
    outputAppId: string;
    outputAppSpaceId?: string;
    outputKeyFieldCode: string;
    outputContentFieldCode: string;
    logAppId?: string;
    logAppSpaceId?: string;
    logKeyFieldCode?: string;
    logContentFieldCode?: string;
    enablesAnimation: boolean;
    enablesShiftEnter: boolean;
    enablesEnter: boolean;
    assistants: AiAssistantPropsV1[];
  };

  type ConfigV2 = {
    version: 2;
    viewId: string;
    outputAppId: string;
    outputAppSpaceId?: string;
    outputKeyFieldCode: string;
    outputContentFieldCode: string;
    logAppId?: string;
    logAppSpaceId?: string;
    logKeyFieldCode?: string;
    logContentFieldCode?: string;
    enablesAnimation?: boolean;
    assistants: AiAssistantPropsV1[];
  };

  type ConfigV1 = {
    version: 1;
    aiModel?: string;
    viewId: string;
    outputAppId: string;
    outputAppSpaceId?: string;
    outputKeyFieldCode: string;
    outputContentFieldCode: string;
    logAppId?: string;
    logAppSpaceId?: string;
    logKeyFieldCode?: string;
    logContentFieldCode?: string;
    enablesAnimation?: boolean;
    aiIcon?: string;
    systemPrompt?: string;
  };
}
