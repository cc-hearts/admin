<script setup lang="ts">
import Headers from "@/components/header/headers.vue";
import Home from "@/layouts/home";
import { useInitTheme } from "./hooks/useInitTheme";
import { ConfigProvider, theme } from 'ant-design-vue'
import { isDark } from '@/configs'
useInitTheme();
</script>

<template>
    <ConfigProvider
      :theme="{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }"
    >
      <Headers />
      <Home />
    </ConfigProvider>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html,
#app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>
