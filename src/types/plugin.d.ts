declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = {
      aiModel?: string;
      viewId: string;
      outputAppId: string;
      outputAppSpaceId?: string;
      outputContentFieldCode: string;
      logAppId?: string;
      logAppSpaceId?: string;
      logKeyFieldCode?: string;
      logContentFieldCode?: string;
      enablesAnimation?: boolean;
      aiIcon?: string;
    };
  }
}
