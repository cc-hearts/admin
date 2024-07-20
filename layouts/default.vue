<template>
  <div class="bg-#000 color-#fff w-full h-full">
    <a-config-provider :theme="getterThemeConfig">
      <slot />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { getterThemeConfig } from '@/configs/theme'
</script>
