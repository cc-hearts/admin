import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup-vitest.config.js'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
