<script setup lang="ts">
import { isDark, locales } from '@/configs'
import Home from '@/layouts/home'
import { ConfigProvider, theme } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/calendar/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useInitTheme } from './hooks/useInitTheme'

const localesMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

useInitTheme()

const antLocale = computed(() => {
  return localesMap[locales.value] || zhCN
})
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :locale="antLocale"
  >
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
