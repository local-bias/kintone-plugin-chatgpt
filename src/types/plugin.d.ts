declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = {
      viewId: string;
      outputAppId: string;
      outputContentFieldCode: string;
    };
  }
}
