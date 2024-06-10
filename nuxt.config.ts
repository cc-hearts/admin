// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', 'nuxt-primevue'],
  primevue: {
    cssLayerOrder: 'reset,primevue',
  },
  css: ['primevue/resources/themes/aura-light-green/theme.css'],
})
