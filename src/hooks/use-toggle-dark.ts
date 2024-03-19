import { isDark } from '@/configs'
import { setTheme } from '@/storage/theme'
export function useToggleDark() {
  const el = document.documentElement
  const token = el.classList
  const hasDarkClassName = token.contains('dark')
  if (hasDarkClassName) {
    token.remove('dark')
  } else {
    token.add('dark')
  }
  isDark.value = !isDark.value
  setTheme(isDark.value)
}
