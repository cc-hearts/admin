import { resolve } from 'path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  resolve: {
    alias: {
      '~': resolve(''),
    },
  },
  test: {
    environment: 'nuxt',
  },
})
