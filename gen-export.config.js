import { defineConfig } from '@cc-heart/gen-index-export'
export default defineConfig({
  dirs: [
    { path: 'src/hooks', output: 'src/hooks/index.ts' },
    { path: 'src/utils', output: 'src/utils/index.ts' },
  ],
})
