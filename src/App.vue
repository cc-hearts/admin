<script setup lang="ts">
import { locales } from '@/configs'
import { ConfigProvider, theme } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useInitTheme } from './hooks/use-init-theme'
import { getAppStore } from './store/app'

const localesMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const appStore = getAppStore()

useInitTheme()

const antLocale = computed(() => {
  return localesMap[locales.value] || zhCN
})
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: appStore.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :locale="antLocale"
  >
    <RouterView />
  </ConfigProvider>
</template>

<style lang="scss">
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
