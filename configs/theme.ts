import { theme } from 'ant-design-vue'
import type { Theme } from '~/types'

const pageTheme = ref<Theme>('light')
export const getterPageTheme = computed(() => pageTheme.value)

const themeConfig = shallowRef({
  algorithm: theme.defaultAlgorithm,
})
export const getterThemeConfig = computed(() => themeConfig)
export const toggleThemeConfig = () => {
  const isLight = pageTheme.value === 'light'
  const themeAlgo = isLight ? theme.darkAlgorithm : theme.defaultAlgorithm
  pageTheme.value = isLight ? 'dark' : 'light'
  themeConfig.value = {
    algorithm: themeAlgo,
  }
}

export const cssNamespace = 'cc'
export const cssToken = reactive({
  [`${cssNamespace}ColorTextAide`]: '#666666',
})
