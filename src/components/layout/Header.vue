<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/composables/use-sidebar'
import { PanelLeft } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    fixed?: boolean
    class?: string
  }>(),
  { fixed: false },
)

const offset = ref(0)
const onScroll = () => {
  const bodyTop = (document?.body?.scrollTop ?? 0) as number
  const docTop = (document?.documentElement?.scrollTop ?? 0) as number
  offset.value = bodyTop || docTop
}

onMounted(() => {
  document.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScroll)
})

const sidebar = useSidebar()
const toggleSidebar = () => {
  sidebar?.toggleSidebar?.()
}
</script>

<template>
  <header
    :class="
      cn(
        'z-50 h-16',
        props.fixed && 'sticky top-0 w-[inherit]',
        offset > 10 && props.fixed ? 'shadow' : 'shadow-none',
        props.class,
      )
    "
  >
    <div
      :class="
        cn(
          'relative flex h-full items-center gap-3 p-4 sm:gap-4',
          offset > 10 &&
            props.fixed &&
            'after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg',
        )
      "
    >
      <button
        type="button"
        aria-label="Toggle Sidebar"
        @click="toggleSidebar"
        class="inline-flex cursor-pointer size-7 items-center justify-center rounded-md border bg-background text-foreground hover:bg-muted max-md:scale-125"
      >
        <PanelLeft class="size-4" />
      </button>
      <div class="h-6 w-px bg-border" />
      <slot />
    </div>
  </header>
</template>
