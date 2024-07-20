import type { Fn } from '@cc-heart/utils/helper'
import { effectScope, watch } from 'vue'

export function useReactiveToPromisify<
  T extends (...args: any) => any,
  S = ReturnType<T>,
  P = any,
>(hookFn: T, callback: (resolve: Fn, reject: Fn, ret: S) => void) {
  const scope = effectScope()

  return () => {
    const ret = new Promise<P>((resolve, reject) => {
      scope.run(() => {
        const ret = hookFn()
        watch(
          ret,
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

    console.log(ret)
    return ret
  }
}
