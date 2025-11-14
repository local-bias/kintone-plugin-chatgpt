import { commonUi, useTranslations } from './w-i18n';
import { mergeDeep } from 'remeda';
import { LANGUAGE } from './global';

const ui = mergeDeep(commonUi, {
  ja: {
    'common.auth.serverError': 'サーバーエラーが発生しました。管理者へお問い合わせください。',
    'common.auth.licenseExpired': 'ライセンスの有効期限が切れています。',
    'common.auth.licenseInvalid': 'ライセンスが無効です',
  },
  en: {},
  es: {},
  zh: {},
  'zh-TW': {},
} as const);

export const t = useTranslations({
  ui,
  lang: LANGUAGE as keyof typeof ui,
  defaultLang: 'ja',
});
