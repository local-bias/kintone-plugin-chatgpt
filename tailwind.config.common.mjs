//@ts-check

/** @type { Omit<import("tailwindcss").Config, "content"> } */
export default {
  theme: {
    extend: {
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        13: '52px',
        14: '56px',
        15: '60px',
        16: '64px',
        17: '68px',
        18: '72px',
        19: '76px',
        20: '80px',
      },
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
