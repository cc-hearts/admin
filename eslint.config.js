import { typescript } from '@cc-heart/eslint-config'

export default [
  {
    ignores: ['.nuxt'],
  },
  ...typescript(),
]
