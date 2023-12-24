import { useIsDark } from '@/hooks'
import { getMenuCollapse, setMenuCollapse } from '@/storage/collapse'
import { getLocates } from '@/storage/locates'
import { type Locales } from '@/types/config'
import { ref } from 'vue'

export const defaultNamespace = 'cc'
export const locales = ref<Locales>(getLocates())
export const isDark = ref(useIsDark())
export const collapsed = ref(getMenuCollapse())
export const defaultMenuIconName = 'AppstoreOutlined'
watch(
  () => collapsed.value,
  (bool) => setMenuCollapse(bool),
)

export const __IS_DEV__ = import.meta.env.DEV
export const __IS_TEST__ = import.meta.env.MODE === 'test'
export const __IS_PROD__ = import.meta.env.PROD

export const githubUrl = 'https://github.com/cc-hearts/admin.git'
