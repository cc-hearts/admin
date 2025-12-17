<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="@container/content">
      <div class="flex items-center justify-between p-4">
        <h1 class="text-lg font-semibold">内容区域</h1>
        <ConfigDrawer />
      </div>
      <div class="p-4">
        <p class="text-sm text-muted-foreground">切换设置可体验 inset / floating / sidebar 三种布局与折叠效果。</p>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import SidebarProvider from './SidebarProvider.vue'
import SidebarInset from './SidebarInset.vue'
import AppSidebar from './AppSidebar.vue'
import ConfigDrawer from '@/components/ConfigDrawer.vue'
</script>
