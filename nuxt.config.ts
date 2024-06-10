// https://nuxt.com/docs/api/configuration/nuxt-config
import { generatorStyles } from './plugins/preset-css-plugin'

generatorStyles()

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@ant-design-vue/nuxt'],
})
