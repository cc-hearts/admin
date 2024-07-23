import type { Fn } from '@cc-heart/utils/helper'
import { effectScope, watch } from 'vue'

export function useReactiveToPromisify<
  T extends (...args: any) => any,
  S = ReturnType<T>,
  P = any,
>(hookFn: T, callback: (resolve: Fn, reject: Fn, ret: S) => void) {
  return () => {
    const scope = effectScope()

    const ret = new Promise<P>((resolve, reject) => {
      scope.run(() => {
        const ret = hookFn()

        const watcher = ret?.watchCallback || ret
        watch(
          watcher,
          () => {
            callback(resolve, reject, ret)
          },
          { immediate: true },
        )
      })
    })

    ret.finally(() => {
      scope.stop()
    })

    return ret
  }
}
