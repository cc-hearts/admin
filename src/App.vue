<script setup lang="ts">
import SideBar from './layouts/sidebar/index.vue'
import Header from './components/layout/Header.vue'
import TopNav from './components/layout/TopNav.vue'
import ConfigDrawer from './components/ConfigDrawer.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import UnauthorizedError from './components/errors/UnauthorizedError.vue'
import ForbiddenError from './components/errors/ForbiddenError.vue'
import NotFoundError from './components/errors/NotFoundError.vue'
import GeneralError from './components/errors/GeneralError.vue'
import MaintenanceError from './components/errors/MaintenanceError.vue'
import DecorativeBackgroundAnimation from './components/lottie/DecorativeBackgroundAnimation.vue'
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
    <div class="relative isolate z-10">
      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
        >
          <DecorativeBackgroundAnimation />
        </div>
      </div>

      <Header>
        <TopNav :links="topNav" />
        <div class="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </Header>

      <main class="relative min-h-[calc(100svh-4rem)] p-6">
        <UnauthorizedError v-if="view === 'error-401'" />
        <ForbiddenError v-else-if="view === 'error-403'" />
        <NotFoundError v-else-if="view === 'error-404'" />
        <GeneralError v-else-if="view === 'error-500'" />
        <MaintenanceError v-else-if="view === 'error-503'" />
        <section v-else class="h-full" aria-label="Dashboard" />
      </main>
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
