import { locales } from '@/configs'
import { type Locales } from '@/types/config'
import { localStorageCache } from '@/utils/define-storage'

export function getLocates() {
  return (localStorageCache.getItem('locates') as Locales) || 'zh-CN'
}

export function setLocates(locates: Locales) {
  locales.value = locates
  localStorageCache.setItem('locates', locates)
}
