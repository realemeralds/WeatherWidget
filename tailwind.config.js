module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.{js,vue,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '2.25rem',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        serif: ['Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif'],
        pro: [
          'SF Pro Display',
          'SF Pro Icons',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        primaryAccent: '#4A1942',
        mainBG: '#0C120C',
        optionsBG: '#1A201A',
        optionsSeparator: '#4C564C',
        optionsNormalBG: '#F9F9F9',
        optionsFocusBG: '#DBDBDB',
        firstResult: '#D9D9D9',
        secondResult: '#E9E9E9',
        thirdResult: '#F8F7F7',
      },
    },
  },
};
