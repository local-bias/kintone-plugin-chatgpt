//@ts-check
const hp = 'https://konomi.app/';
const commonCdn = 'https://kintone-plugin.konomi.app/common';
const localhost = 'https://127.0.0.1:9152';

/** @type {import('@konomi-app/kintone-utilities').PluginConfig} */
export default {
  id: 'ribbit-kintone-plugin-chatgpt',
  pluginReleasePageUrl: 'https://ribbit.konomi.app/kintone-plugin/',
  manifest: {
    base: {
      manifest_version: 1,
      version: '4.12.0',
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
      desktop: {
        js: [`${commonCdn}/desktop.js`],
        css: [`${commonCdn}/desktop.css`],
      },
      mobile: {
        js: [`${commonCdn}/desktop.js`],
        css: [`${commonCdn}/desktop.css`],
      },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/config.js`],
        css: [`${commonCdn}/config.css`],
        required_params: [],
      },
    },
    dev: {
      desktop: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      mobile: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      config: {
        js: [`${localhost}/dist/dev/config/index.js`],
        css: [`${localhost}/dist/dev/config.css`],
      },
    },
    prod: {
      desktop: { js: [`desktop.js`], css: [`desktop.css`] },
      mobile: { js: [`desktop.js`], css: [`desktop.css`] },
      config: { js: [`config.js`], css: [`config.css`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
};
