<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronsUpDown, Plus } from 'lucide-vue-next'
import { useSidebar } from '@/composables/use-sidebar'
import type { Team } from './types'
import { cn } from '@/lib/utils'

const props = defineProps<{
  teams: Team[]
}>()

const sidebar = useSidebar()
const activeTeam = ref<Team>(props.teams[0]!)
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const { isMobile } = sidebar!

function onSelect(team: Team) {
  activeTeam.value = team
  open.value = false
}

function onDocPointerDown(e: Event) {
  const el = root.value
  const t = e.target as Node
  if (el && t && !el.contains(t)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown, { capture: true })
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointerDown, {
    capture: true,
  } as any)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    :class="
      sidebar?.state?.value !== 'collapsed' || isMobile ? 'p-2' : 'px-2 py-0'
    "
    ref="root"
  >
    <div class="relative">
      <button
        @click="open = !open"
        :class="
          cn(
            sidebar?.state?.value !== 'collapsed' || isMobile
              ? 'flex w-full items-center gap-2 rounded-md p-2 text-left text-sm transition'
              : 'flex w-full items-center justify-center rounded-md text-sm transition hover:bg-muted',
            open && 'bg-sidebar-accent text-sidebar-accent-foreground',
          )
        "
      >
        <div
          class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
        >
          <component :is="activeTeam.logo" class="size-4" />
        </div>
        <template v-if="sidebar?.state?.value !== 'collapsed' || isMobile">
          <div class="grid flex-1 text-start text-sm leading-tight">
            <span class="truncate font-semibold">{{ activeTeam.name }}</span>
            <span class="truncate text-xs">{{ activeTeam.plan }}</span>
          </div>
          <ChevronsUpDown class="ms-auto size-4" />
        </template>
      </button>

      <div
        v-if="open"
        class="absolute z-30 min-w-56 rounded-lg border bg-popover text-popover-foreground shadow-md"
        :class="isMobile ? 'left-0 top-full mt-1' : 'left-full top-0 ms-1'"
      >
        <div class="px-2 py-1.5 text-xs text-muted-foreground">Teams</div>
        <div class="py-1">
          <button
            v-for="(team, index) in props.teams"
            :key="team.name"
            @click="onSelect(team)"
            class="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-muted"
          >
            <div
              class="flex size-6 items-center justify-center rounded-sm border"
            >
              <component :is="team.logo" class="size-4 shrink-0" />
            </div>
            <span class="truncate">{{ team.name }}</span>
            <span class="ms-auto text-xs text-muted-foreground"
              >⌘{{ index + 1 }}</span
            >
          </button>
        </div>
        <div class="border-t p-2">
          <button
            class="flex w-full items-center gap-2 rounded-md border bg-background px-2 py-2 text-left text-sm"
          >
            <div
              class="flex size-6 items-center justify-center rounded-md border bg-background"
            >
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">Add team</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
