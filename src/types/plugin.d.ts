declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = { version: 1 } & StorageV1;

    type StorageV1 = {
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
}
