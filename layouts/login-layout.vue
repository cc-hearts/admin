<template>
  <div
    class="flex w-full h-full justify-center items-center bg-[rgb(243,244,246)]"
  >
    <ConfigProvider>
      <slot />
    </ConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
</script>

<style></style>
