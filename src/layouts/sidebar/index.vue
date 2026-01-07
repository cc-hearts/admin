<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="@container/content">
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar.vue'
</script>
