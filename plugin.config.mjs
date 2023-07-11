const hp = 'https://konomi.app/';
const commonCdn = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest';
const cdn = 'https://kintone-plugin.ribbit.workers.dev/chatgpt';
const localhost = 'https://127.0.0.1:5500';

/** @type {import('./src/types/plugin-config').PluginConfig} */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '2.0.0',
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
        js: [`${commonCdn}/dist/desktop.js`],
        css: [],
      },
      mobile: {
        js: [`${commonCdn}/dist/desktop.js`],
        css: [],
      },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/dist/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      mobile: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      config: { js: [`${localhost}/dist/dev/config/index.js`] },
    },
    prod: {
      desktop: { js: [`${cdn}/v2/desktop`] },
      mobile: { js: [`${cdn}/v2/desktop`] },
      config: { js: [`${cdn}/v2/config`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
  },
};
