/* eslint-disable @typescript-eslint/no-var-requires */
const autoImport = require('./.eslintrc-auto-import.json')
module.exports = {
  extends: '@cc-heart/eslint-config',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'laster',
  },
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    'no-case-declarations': 'off',
  },
  ...autoImport,
}
