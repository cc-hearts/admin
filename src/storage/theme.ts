import type { Theme } from '@/types'
import { localStorageCache } from '@/utils/define-storage'

export function getTheme(): Theme {
  return localStorageCache.getItem('theme') as Theme
}

export function setTheme(isDark: boolean) {
  localStorageCache.setItem('theme', isDark ? 'dark' : 'light')
}
