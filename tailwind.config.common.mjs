//@ts-check

/** @type { Omit<import("tailwindcss").Config, "content"> } */
export default {
  theme: {
    extend: {
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
      },
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
