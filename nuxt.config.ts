// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://0.0.0.0:3001/api',
        changeOrigin: true,
      },
    },
  },

  ssr: false,
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@tresjs/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    'motion-v/nuxt',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@tresjs/cientos',
        'three',
      ],
    },
  },

  fonts: {
    providers: {
      google: false,
      googleicons: false,
    },
    families: [
      { name: 'shuhei', src: '/ShuHeiTi.woff2', provider: 'local', preload: true },
      { name: 'misans', src: '/MiSans.woff2', provider: 'local', preload: true },
    ],
  },
  css: ['~/assets/css/main.css'],
});
