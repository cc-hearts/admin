import { ref, watchEffect } from 'vue'
import { getCookie, setCookie } from '@/lib/cookies'

export type Direction = 'ltr' | 'rtl'

const DEFAULT_DIRECTION: Direction = 'ltr'
const DIRECTION_COOKIE_NAME = 'dir'
const DIRECTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const dir = ref<Direction>(
  (getCookie(DIRECTION_COOKIE_NAME) as Direction) || DEFAULT_DIRECTION,
)

function setDir(next: Direction) {
  dir.value = next
  setCookie(DIRECTION_COOKIE_NAME, next, DIRECTION_COOKIE_MAX_AGE)
}

function resetDir() {
  setDir(DEFAULT_DIRECTION)
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', dir.value)
  }
})

export function useDirection() {
  return {
    defaultDir: DEFAULT_DIRECTION,
    dir,
    setDir,
    resetDir,
  }
}
