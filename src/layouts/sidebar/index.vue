<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="@container/content">
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import SidebarProvider from './SidebarProvider.vue'
import AppSidebar from './AppSidebar.vue'
import SidebarInset from './SidebarInset.vue'
</script>
