import { ref,  inject, provide, type InjectionKey, type Ref, type ComputedRef } from 'vue'

// 常量定义
export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

// Context 类型
type SidebarContext = {
  state: ComputedRef<'expanded' | 'collapsed'>
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  isMobile: Ref<boolean>
  openMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
  toggleSidebar: () => void
}

const SIDEBAR_CONTEXT_KEY = Symbol('SIDEBAR_CONTEXT_KEY') as InjectionKey<SidebarContext>

export function useSidebar() {
  const context = inject(SIDEBAR_CONTEXT_KEY)

  return context
}

export function provideSidebarContext(context: SidebarContext) {
  provide(SIDEBAR_CONTEXT_KEY, context)
}

export function useIsMobile() {
  const isMobile = ref(false)
  if (typeof window !== 'undefined') {
     const mql = window.matchMedia(`(max-width: 768px)`)
     const onChange = () => { isMobile.value = mql.matches }
     mql.addEventListener('change', onChange)
     isMobile.value = mql.matches
  }
  return isMobile
}