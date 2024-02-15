import * as MenuModule from './menu'

export function getHandlers() {
  return [
    ...Object.values(MenuModule).map((menu) => {
      return menu()
    }),
  ]
}
