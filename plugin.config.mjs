//@ts-check
const hp = 'https://konomi.app';
const cdn = 'https://kintone-plugin.konomi.app';
const key = 'chatgpt';
const localhost = 'https://127.0.0.1:9152';

/** @type { import('@konomi-app/kintone-utilities').PluginConfig } */
export default {
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: 'https://ribbit.konomi.app/kintone-plugin/',
  manifest: {
    base: {
      manifest_version: 1,
      version: '4.14.0',
      type: 'APP',
      name: {
        en: 'ChatGPT integration plugin',
        ja: 'ChatGPT連携プラグイン',
        zh: 'ChatGPT集成插件',
      },
      description: {
        en: 'You can receive answers from ChatGPT and record the content of your questions as logs in the application.',
        ja: 'ChatGPTから回答を得ることができます。質問した内容をログとしてアプリに記録することができます。',
        zh: '您可以从ChatGPT获得答案，并将您的问题内容记录为应用程序中的日志。',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp },
      desktop: { js: [`${cdn}/common/desktop.js`], css: [`${cdn}/common/desktop.css`] },
      mobile: { js: [`${cdn}/common/desktop.js`], css: [`${cdn}/common/desktop.css`] },
      config: {
        html: 'config.html',
        js: [`${cdn}/common/config.js`],
        css: [`${cdn}/common/config.css`],
        required_params: [],
      },
    },
    dev: {
      desktop: {
        js: [`${localhost}/dist/dev/desktop.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      mobile: {
        js: [`${localhost}/dist/dev/desktop.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      config: {
        js: [`${localhost}/dist/dev/config.js`],
        css: [`${localhost}/dist/dev/config.css`],
      },
    },
    prod: {
      desktop: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      mobile: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      config: { js: [`${cdn}/${key}/config.js`], css: [`${cdn}/${key}/config.css`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
};
