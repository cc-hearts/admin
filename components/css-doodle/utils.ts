import { defineOnceFn } from '@cc-heart/utils'

export const initCssDoodle = defineOnceFn(async () => {
  // @ts-expect-error: expect error
  await import('css-doodle')
})
