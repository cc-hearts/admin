export interface AppStore {
  openConfigModal: boolean
  theme: 'light' | 'dark' | 'auto'
  isDark: boolean
}

const appStore = reactive<AppStore>({
  openConfigModal: false,
  theme: 'light',
  isDark: false,
})

export function getAppStore() {
  return appStore
}

export function getterOpenConfigModal() {
  return computed(() => appStore.openConfigModal)
}

export function toggleOpenConfigModal() {
  appStore.openConfigModal = !appStore.openConfigModal
}

export function toggleIsDark() {
  appStore.isDark = !appStore.isDark
}
