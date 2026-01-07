<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useSidebar } from '@/composables/use-sidebar'
import { PanelLeft } from 'lucide-vue-next'

const props = defineProps<{ class?: string }>()
const sidebar = useSidebar()
</script>

<template>
  <button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="sidebar?.toggleSidebar()"
  >
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  </button>
</template>
