import { getCurrentInstance } from 'vue'
export function useExposed(target: Record<string, any>) {
  let isOnce = false
  const ctx = getCurrentInstance()
  watchEffect(async () => {
    await nextTick()
    if (isOnce) return
    if (ctx?.exposeProxy) {
      isOnce = true
      Object.assign(ctx.exposeProxy, target)
    }
  })
}
