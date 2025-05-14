//@ts-check
const hp = 'https://konomi.app';
const cdn = 'https://kintone-plugin.konomi.app';
const key = 'chatgpt';

/** @satisfies { Plugin.Meta.Config } */
export default /** @type { const } */ ({
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: 'https://ribbit.konomi.app/kintone-plugin/',
  server: {
    port: 9152,
  },
  lint: {
    build: false,
  },
  tailwind: {
    css: 'src/styles/global.css',
    config: {
      desktop: 'tailwind.config.desktop.mjs',
      config: 'tailwind.config.config.mjs',
    },
  },
  manifest: {
    base: {
      manifest_version: 1,
      version: '4.22.1',
      type: 'APP',
      name: {
        en: 'AI Chat Plugin',
        ja: 'AIチャットプラグイン',
        zh: 'AI聊天插件',
        'zh-TW': 'AI聊天外掛',
        es: 'Plugin de chat de IA',
        'pt-BR': 'Plugin de Chat de IA',
        th: 'ปลั๊กอินแชท AI',
      },
      description: {
        en: 'You can get answers from major LLMs. You can also record your questions as logs in the app.',
        ja: '主要なLLMから回答を得ることができます。質問した内容をログとしてアプリに記録することができます。',
        zh: '您可以从主要的LLM获取答案。您还可以将提问内容作为日志记录到应用中。',
        'zh-TW': '您可以從主要的LLM獲得回答。也可以將提問內容作為日誌記錄到應用程式中。',
        es: 'Puede obtener respuestas de los principales LLM. También puede registrar las preguntas como registros en la aplicación.',
        'pt-BR':
          'Você pode obter respostas dos principais LLMs. Também pode registrar as perguntas como logs no aplicativo.',
        th: 'คุณสามารถรับคำตอบจาก LLM หลัก ๆ ได้ และสามารถบันทึกคำถามเป็นบันทึกในแอปได้',
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
});
