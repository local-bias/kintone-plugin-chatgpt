declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = StorageV1 | StorageV2 | StorageV3;

    type LatestStorage = StorageV3;

    type AiAssistantProps = {
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
      assistants: AiAssistantProps[];
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
      assistants: AiAssistantProps[];
    };
  }
}
