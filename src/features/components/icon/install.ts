import { App } from 'vue'
import * as Outline from './Outlined'
import * as Filled from './Filled'
import * as TwoTone from './TwoTone'

function installIcon(
  App: App,
  keys: string,
  module: Record<string, globalThis.Component>,
) {
  App.component(keys, Reflect.get(module, keys))
}

export function install(app: App) {
  ;[Outline, Filled, TwoTone].forEach((module) => {
    Object.keys(module).forEach((keys) => {
      installIcon(app, keys, module)
    })
  })
}
