import { getMenuCollapse, setMenuCollapse } from '@/storage/collapse'
import { getLocates } from '@/storage/locates'
import { type Locales } from '@/types/config'
import { ref } from 'vue'

export const defaultNamespace = 'cc-admin'
export const locales = ref<Locales>(getLocates())
export const collapsed = ref(getMenuCollapse())
export const defaultMenuIconName = 'AppstoreOutlined'

watch(
  () => collapsed.value,
  (bool) => setMenuCollapse(bool),
)

export const __IS_DEV__ = !import.meta.env.PROD

export const githubUrl = 'https://github.com/cc-hearts/admin.git'
