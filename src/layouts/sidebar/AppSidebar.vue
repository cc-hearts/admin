<script setup lang="ts">
import Sidebar from './sidebar.vue'
import { useLayout } from '@/composables/use-layout'

const layout = useLayout()
</script>

<template>
  <Sidebar
    :collapsible="layout?.collapsible?.value ?? 'icon'"
    :variant="layout?.variant?.value ?? 'inset'"
  >
    <div data-slot="sidebar-header" class="flex flex-col gap-2 p-2">
      <div class="text-sm font-semibold">Header</div>
    </div>
    <div
      data-slot="sidebar-content"
      class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
    >
      <ul class="flex w-full min-w-0 flex-col gap-1 p-2">
        <li class="group relative">
          <button
            class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start text-sm outline-hidden ring-sidebar-ring transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>span:last-child]:truncate"
          >
            <span class="size-4 shrink-0 rounded-sm bg-sidebar-border" />
            <span>Menu Item</span>
          </button>
        </li>
      </ul>
    </div>
    <div data-slot="sidebar-footer" class="flex flex-col gap-2 p-2">
      <div class="text-xs text-muted-foreground">Footer</div>
    </div>
  </Sidebar>
</template>

