<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
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
    <SidebarHeader>
      <TeamSwitcher :teams="sidebarData.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavGroup
        v-for="group in sidebarData.navGroups"
        :key="group.title"
        v-bind="group"
      />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="sidebarData.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
