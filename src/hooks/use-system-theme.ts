export function useSystemTheme() {
  const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
  return themeMedia.matches ? 'light' : 'dark'
}
