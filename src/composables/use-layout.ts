import { ref } from 'vue'
import { getCookie, setCookie } from '@/lib/cookies'

export type Collapsible = 'offcanvas' | 'icon' | 'none'
export type Variant = 'inset' | 'sidebar' | 'floating'

const LAYOUT_COLLAPSIBLE_COOKIE_NAME = 'layout_collapsible'
const LAYOUT_VARIANT_COOKIE_NAME = 'layout_variant'
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const DEFAULT_VARIANT: Variant = 'sidebar'
const DEFAULT_COLLAPSIBLE: Collapsible = 'icon'


const collapsible = ref<Collapsible>(
  (getCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME) as Collapsible) ||
  DEFAULT_COLLAPSIBLE
)
const variant = ref<Variant>(
  (getCookie(LAYOUT_VARIANT_COOKIE_NAME) as Variant) || DEFAULT_VARIANT
)

const setCollapsible = (c: Collapsible) => {
  collapsible.value = c
  setCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME, c, LAYOUT_COOKIE_MAX_AGE)
}
const setVariant = (v: Variant) => {
  variant.value = v
  setCookie(LAYOUT_VARIANT_COOKIE_NAME, v, LAYOUT_COOKIE_MAX_AGE)
}
const resetLayout = () => {
  setCollapsible(DEFAULT_COLLAPSIBLE)
  setVariant(DEFAULT_VARIANT)
}




export function useLayout() {
  return {
    resetLayout,
    defaultCollapsible: DEFAULT_COLLAPSIBLE,
    collapsible,
    setCollapsible,
    defaultVariant: DEFAULT_VARIANT,
    variant,
    setVariant,
  }
}

