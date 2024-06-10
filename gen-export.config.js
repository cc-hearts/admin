import { defineConfig } from '@cc-heart/gen-index-export'
export default defineConfig({
  dirs: [{ path: 'components', output: 'components/index.ts', dirIndex: true }],
})
