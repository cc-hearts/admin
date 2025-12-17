<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'
import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
} from '@/composables/use-sidebar'
import { provideSidebarContext, useIsMobile } from '@/composables/use-sidebar'

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    class?: string
    style?: Record<string, string>
  }>(),
  { defaultOpen: true }
)

const isMobile = useIsMobile()
const openMobile = ref(false)

const _open = ref(!!props.defaultOpen)
const open = computed(() => _open.value)
const setOpen = (value: boolean) => {
  _open.value = value
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}
const setOpenMobile = (value: boolean) => {
  openMobile.value = value
}

const toggleSidebar = () => {
  if (isMobile.value) {
    setOpenMobile(!openMobile.value)
  } else {
    setOpen(!open.value)
  }
}

const state = computed(() => (open.value ? 'expanded' : 'collapsed'))

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
})

const styleVars = {
  '--sidebar-width': SIDEBAR_WIDTH,
  '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
  ...(props.style || {}),
} as Record<string, string>

const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
    (event.metaKey || event.ctrlKey)
  ) {
    event.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    data-slot="sidebar-wrapper"
    :style="styleVars"
    :class="cn('group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar', props.class)"
  >
    <slot />
  </div>
  <!-- TooltipProvider 对齐省略，Vue 版可后续补充 -->
</template>

