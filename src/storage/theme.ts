import type { AppStore } from '@/store/app'
import { localStorageCache } from '@/utils/define-storage'

export function getTheme(): AppStore['theme'] {
  return localStorageCache.getItem('theme') as AppStore['theme']
}

export function setLocalTheme(theme: AppStore['theme']) {
  localStorageCache.setItem('theme', theme)
}
