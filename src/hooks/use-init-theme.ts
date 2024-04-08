import { getTheme } from '@/storage/theme'
import { getAppStore, toggleIsDark } from '@/store/app'
import { useSystemTheme } from './use-system-theme'

export function useInitTheme() {
  const theme = getTheme()

  if (theme === 'dark' || (theme === 'auto' && useSystemTheme() === 'dark')) {
    document.documentElement.classList.add('dark')
    toggleIsDark()
  }

  const appStore = getAppStore()
  // 监听系统的变量
  const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
  themeMedia.addEventListener('change', (e) => {
    if (theme === 'auto') {
      appStore.isDark = !e.matches
      const methodField = appStore.isDark ? 'add' : 'remove'
      document.documentElement.classList[methodField]('dark')
    }
  })
}
