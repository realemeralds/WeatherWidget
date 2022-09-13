import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST, // overwritten by process.env.GQL_HOST
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  meta: {
    title: 'WeatherWidget',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  plugins: ['~/plugins/fontawesome.js'],

  target: 'static',
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxt/image-edge', 'nuxt-graphql-client'],

  tailwindcss: {
    configPath: '~/tailwind.config.js',
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
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
        },
        extend: {
          fontFamily: {
            serif: [
              'Helvetica Neue',
              'Helvetica',
              'Roboto',
              'Arial',
              'sans-serif',
            ],
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
            firstResult: '#D9D9D9',
            secondResult: '#E9E9E9',
            thirdResult: '#F8F7F7',
          },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  postcss: {
    // Add plugin names as key and arguments as value
    // Install them before as dependencies with npm or yarn
    plugins: {
      // Disable a plugin by passing false as value
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
