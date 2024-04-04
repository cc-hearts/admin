<template>
  <CcDrawer :open="visible" @update:open="toggleOpenConfigModal">
    <CcDivider>主题配置</CcDivider>
    <ThemeCard />
  </CcDrawer>
</template>

<script setup lang="ts">
import { toggleOpenConfigModal, getterOpenConfigModal } from '@/store/app'
import { CcDrawer, CcDivider } from '@/components'
import ThemeCard from './theme/theme-card.vue'
const visible = getterOpenConfigModal()
</script>

<style></style>
