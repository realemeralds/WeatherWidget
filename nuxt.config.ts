import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
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
  css: [
    '~/assets/scss/global.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  plugins: ['~/plugins/fontawesome.js'],

  target: 'static',
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxt/image-edge'],

  tailwindcss: {
    configPath: '~/tailwind.config.js'
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
