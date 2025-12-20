<script setup lang="ts">
import Sidebar from './sidebar.vue'
import { useLayout } from '@/composables/use-layout'
import { sidebarData } from '@/components/layout/data/sidebar-data'
import TeamSwitcher from '@/components/layout/TeamSwitcher.vue'
import NavGroup from '@/components/layout/NavGroup.vue'
import NavUser from '@/components/layout/NavUser.vue'

const layout = useLayout()
</script>

<template>
  <Sidebar
    :collapsible="layout?.collapsible?.value ?? 'icon'"
    :variant="layout?.variant?.value ?? 'inset'"
  >
    <div data-slot="sidebar-header" class="flex flex-col gap-2 p-2">
      <TeamSwitcher :teams="sidebarData.teams" />
    </div>
    <div
      data-slot="sidebar-content"
      class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden group-data-[variant=floating]:overflow-visible"
    >
      <NavGroup
        v-for="group in sidebarData.navGroups"
        :key="group.title"
        v-bind="group"
      />
    </div>
    <div data-slot="sidebar-footer" class="flex flex-col gap-2 p-2">
      <NavUser :user="sidebarData.user" />
    </div>
  </Sidebar>
</template>
