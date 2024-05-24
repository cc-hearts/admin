import { getAppStore } from '@/store/app'

export function useToggleThemeAnimation(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const appStore = getAppStore()

  let _isDark: boolean

  const transition = document.startViewTransition(() => {
    const root = document.documentElement
    _isDark = root.classList.contains('dark')
    const methodField = _isDark ? 'remove' : 'add'
    root.classList[methodField]('dark')
    appStore.isDark = !appStore.isDark
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]

    document.documentElement.animate(
      {
        clipPath: _isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 300,
        easing: 'linear',
        pseudoElement: _isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
