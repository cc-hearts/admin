import { useIsDark } from '@/hooks'
import { getMenuCollapse, setMenuCollapse } from '@/storage/collapse'
import { ref } from 'vue'
export const defaultNamespace = 'cc'

export const isDark = ref(useIsDark())
export const collapsed = ref(getMenuCollapse())

watch(
  () => collapsed.value,
  (bool) => setMenuCollapse(bool),
)

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const githubUrl = 'https://github.com/cc-hearts/admin.git'
