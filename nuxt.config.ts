// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@ant-design-vue/nuxt'],
  antd: {
    extractStyle: true,
  },
  css: ['ant-design-vue/dist/reset.css'],
  vite: {
    resolve: {
      alias: {
        'ant-design-vue/dist': 'ant-design-vue/dist',
        'ant-design-vue/es': 'ant-design-vue/es',
        'ant-design-vue/lib': 'ant-design-vue/es',
        'ant-design-vue': 'ant-design-vue/es',
      },
    },
  },
})
