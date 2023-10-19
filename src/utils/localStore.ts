import type { theme } from '@/types'
export function getTheme(): theme {
  return localStorage.getItem('theme') as theme
}

export function setTheme(isDark: boolean) {
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
