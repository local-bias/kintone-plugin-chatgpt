import { commonUi, useTranslations } from './w-i18n';
import { mergeDeep } from 'remeda';
import { LANGUAGE } from './global';

const ui = mergeDeep(commonUi, {
  ja: {},
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
