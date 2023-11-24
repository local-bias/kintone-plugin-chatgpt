declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = StorageV1 | StorageV2 | StorageV3 | StorageV4;

    type LatestStorage = StorageV4;

    type AiAssistantProps = LatestStorage['assistants'][number];

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

    type StorageV1 = {
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

    type StorageV2 = {
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

    type StorageV3 = {
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

    type StorageV4 = {
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
  }
}
