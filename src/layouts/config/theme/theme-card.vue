<template>
  <div class="flex justify-around">
    <div
      v-for="(item, index) in themeOptions"
      :key="index"
      class="flex flex-col items-center cursor-pointer"
      @click="toggleSystemTheme($event, item.theme)"
    >
      <img
        class="w-25 h-15 rounded-1 hover:border-color-#999 border-2 border-solid border-color-transparent transition"
        :class="
          item.theme === appStore.theme && [
            '!border-color-[var(--primary-color)]',
          ]
        "
        :src="item.src"
      />
      <text class="m-t-1">{{ item.label }}</text>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeLightPng from '@/assets/imgs/layout/theme-light.png'
import ThemeDarkPng from '@/assets/imgs/layout/theme-dark.png'
import ThemeLightDarkPng from '@/assets/imgs/layout/theme-light-dark.png'
import { useToggleThemeAnimation } from './use-toggle-theme-animation'
import { useSystemTheme } from '@/hooks/use-system-theme'
import { getAppStore, setAppStoreTheme } from '@/store/app'
import { setLocalTheme } from '@/storage'

const themeOptions = [
  { label: '浅色主题', theme: 'light', src: ThemeLightPng },
  { label: '深色主题', theme: 'dark', src: ThemeDarkPng },
  { label: '跟随系统', theme: 'auto', src: ThemeLightDarkPng },
] as const

const appStore = getAppStore()

const toggleSystemTheme = (
  event: MouseEvent,
  theme: 'light' | 'dark' | 'auto',
) => {
  setLocalTheme(theme)
  setAppStoreTheme(theme)
  if (
    (theme === 'light' && !appStore.isDark) ||
    (theme === 'dark' && appStore.isDark)
  )
    return

  if (theme === 'auto') {
    const systemTheme = useSystemTheme()
    if (
      (systemTheme === 'light' && !appStore.isDark) ||
      (systemTheme === 'dark' && appStore.isDark)
    )
      return
  }

  useToggleThemeAnimation(event)
}
</script>

<style></style>
