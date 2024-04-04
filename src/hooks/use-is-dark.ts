export function useIsDark() {
  if (typeof document === 'undefined') {
    throw new Error(
      'There is no document attribute in the current host environment.',
    )
  }

  return document.documentElement.classList.contains('dark')
}
