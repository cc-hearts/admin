<template>
  <div class="bg-#000 color-#fff w-full h-full">
    <a-config-provider :theme="themeConfig">
      <slot />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { theme, type ConfigProviderProps } from 'ant-design-vue'

const themeConfig = {
  algorithm: theme.darkAlgorithm,
} as ConfigProviderProps['theme']
</script>
