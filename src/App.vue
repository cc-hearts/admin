<script setup lang="ts">
import SideBar from './layouts/sidebar/index.vue'
import Header from './components/layout/Header.vue'
import TopNav from './components/layout/TopNav.vue'
import ConfigDrawer from './components/ConfigDrawer.vue'
import UnauthorizedError from './components/errors/UnauthorizedError.vue'
import ForbiddenError from './components/errors/ForbiddenError.vue'
import NotFoundError from './components/errors/NotFoundError.vue'
import GeneralError from './components/errors/GeneralError.vue'
import MaintenanceError from './components/errors/MaintenanceError.vue'
import { onMounted, ref } from 'vue'

const topNav = [
  { title: 'Overview', href: '#overview', isActive: true },
  { title: 'Customers', href: '#customers', isActive: false, disabled: true },
  { title: 'Products', href: '#products', isActive: false, disabled: true },
  { title: 'Settings', href: '#settings', isActive: false, disabled: true },
]

type View =
  | 'dashboard'
  | 'error-401'
  | 'error-403'
  | 'error-404'
  | 'error-500'
  | 'error-503'
const view = ref<View>('dashboard')
const updateViewFromHash = () => {
  const hash = window.location.hash.replace('#', '')
  switch (hash) {
    case 'errors/401':
      view.value = 'error-401'
      break
    case 'errors/403':
      view.value = 'error-403'
      break
    case 'errors/404':
      view.value = 'error-404'
      break
    case 'errors/500':
      view.value = 'error-500'
      break
    case 'errors/503':
      view.value = 'error-503'
      break
    default:
      view.value = 'dashboard'
  }
}
onMounted(() => {
  updateViewFromHash()
  window.addEventListener('hashchange', updateViewFromHash)
})
</script>

<template>
  <SideBar>
    <Header>
      <TopNav :links="topNav" />
      <div class="ms-auto flex items-center space-x-4">
        <ConfigDrawer />
      </div>
    </Header>
    <div v-if="view === 'dashboard'" class="p-4">
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
      <div class="mt-6 text-xs text-muted-foreground">
        Errors playground: <a href="#errors/401" class="underline">401</a>,
        <a href="#errors/403" class="underline">403</a>,
        <a href="#errors/404" class="underline">404</a>,
        <a href="#errors/500" class="underline">500</a>,
        <a href="#errors/503" class="underline">503</a>
      </div>
    </div>
    <UnauthorizedError v-else-if="view === 'error-401'" />
    <ForbiddenError v-else-if="view === 'error-403'" />
    <NotFoundError v-else-if="view === 'error-404'" />
    <GeneralError v-else-if="view === 'error-500'" />
    <MaintenanceError v-else-if="view === 'error-503'" />
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
