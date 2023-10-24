import { locales } from '@/configs'
import { type Locales } from '@/types/config'
export function getLocates() {
  return (localStorage.getItem('locates') as Locales) || 'zh-CN'
}

export function setLocates(locates: Locales) {
  locales.value = locates
  localStorage.setItem('locates', locates)
}
