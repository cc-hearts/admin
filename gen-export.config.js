import { defineConfig } from '@cc-heart/gen-index-export'
export default defineConfig({
  dirs: [{ path: 'components/ui', output: 'components/index.ts' }],
})
