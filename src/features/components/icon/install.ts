import { App } from 'vue'
import * as Outline from './Outlined'
import * as Filled from './Filled'
import * as TwoTone from './TwoTone'

const componentMap = new Map<string, globalThis.Component>()
function installIcon(
  App: App,
  keys: string,
  module: Record<string, globalThis.Component>,
) {
  const fn = Reflect.get(module, keys)
  componentMap.set(keys, fn)
  App.component(keys, fn)
}

export function install(app: App) {
  ;[Outline, Filled, TwoTone].forEach((module) => {
    console.log(module)
    Object.keys(module).forEach((keys) => {
      installIcon(app, keys, module)
    })
  })
}

export function getIconFunc(name: string) {
  return componentMap.get(name)
}
