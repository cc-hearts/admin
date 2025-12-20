<script setup lang="ts">
import SideBar from './layouts/sidebar/index.vue'
import Header from './components/layout/Header.vue'
import TopNav from './components/layout/TopNav.vue'
import ConfigDrawer from './components/ConfigDrawer.vue'

const topNav = [
  { title: 'Overview', href: '#overview', isActive: true },
  { title: 'Customers', href: '#customers', isActive: false, disabled: true },
  { title: 'Products', href: '#products', isActive: false, disabled: true },
  { title: 'Settings', href: '#settings', isActive: false, disabled: true },
]
</script>

<template>
  <SideBar>
    <Header>
      <TopNav :links="topNav" />
      <div class="ms-auto flex items-center space-x-4">
        <ConfigDrawer />
      </div>
    </Header>
    <div class="p-4">
      <div class="mb-2 flex items-center justify-between">
        <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div class="text-muted-foreground text-sm">Content area</div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border p-4">
          <div class="text-sm font-medium">Card A</div>
          <div class="text-xs text-muted-foreground mt-1">Description</div>
        </div>
        <div class="rounded-lg border p-4">
          <div class="text-sm font-medium">Card B</div>
          <div class="text-xs text-muted-foreground mt-1">Description</div>
        </div>
        <div class="rounded-lg border p-4">
          <div class="text-sm font-medium">Card C</div>
          <div class="text-xs text-muted-foreground mt-1">Description</div>
        </div>
      </div>
    </div>
  </SideBar>
</template>

<style>
html,
body,
#app {
    height: 100%;
    width: 100%;
}

* {
    box-sizing: border-box;
}
</style>
