import { ref, watchEffect } from 'vue'
import { getCookie, setCookie } from '@/lib/cookies'

export type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = Exclude<Theme, 'system'>

const DEFAULT_THEME: Theme = 'system'
const THEME_COOKIE_NAME = 'vite-ui-theme'
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const theme = ref<Theme>(
  (getCookie(THEME_COOKIE_NAME) as Theme) || DEFAULT_THEME,
)
const resolvedTheme = ref<ResolvedTheme>('light')

function applyThemeClass(currentResolvedTheme: ResolvedTheme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(currentResolvedTheme)
}

function computeResolved(t: Theme): ResolvedTheme {
  if (typeof window !== 'undefined' && t === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return (t as ResolvedTheme) || 'light'
}

function setTheme(t: Theme) {
  theme.value = t
  setCookie(THEME_COOKIE_NAME, t, THEME_COOKIE_MAX_AGE)
}

function resetTheme() {
  setTheme(DEFAULT_THEME)
}

watchEffect(() => {
  resolvedTheme.value = computeResolved(theme.value)
  applyThemeClass(resolvedTheme.value)
  if (typeof document !== 'undefined') {
    const themeColor = resolvedTheme.value === 'dark' ? '#020817' : '#fff'
    const meta = document.querySelector("meta[name='theme-color']")
    if (meta) meta.setAttribute('content', themeColor)
  }
  if (typeof window !== 'undefined') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (theme.value === 'system') {
        const next = mql.matches ? 'dark' : 'light'
        resolvedTheme.value = next
        applyThemeClass(next)
      }
    }
    mql.addEventListener('change', onChange, { once: true })
  }
})

export function useTheme() {
  return {
    defaultTheme: DEFAULT_THEME,
    theme,
    resolvedTheme,
    setTheme,
    resetTheme,
  }
}
