import { getTheme } from '@/storage/theme'
import { useIsDark, useToggleDark } from '.'

export function useInitTheme() {
  const theme = getTheme()
  const isDark = useIsDark()
  if ((theme === 'dark' && !isDark) || (theme === 'light' && isDark)) {
    useToggleDark()
  }
}
