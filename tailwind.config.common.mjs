//@ts-check

/** @type { Omit<import("tailwindcss").Config, "content"> } */
export default {
  theme: {
    extend: {
      maxWidth: {
        content: '900px',
      },
      gridTemplateColumns: {
        message: '30px 1fr',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
