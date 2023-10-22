import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    // ...custom presets
  ],
  rules: [
    [
      'bg-main',
      {
        'background-color': 'var(--main-background-color)',
      },
    ],
  ],
})
