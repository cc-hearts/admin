import { localStorageCache } from '@/utils/define-storage'

export function setMenuCollapse(collapse: boolean) {
  localStorageCache.setItem('menuCollapse', String(collapse))
}

export function getMenuCollapse() {
  return localStorageCache.getItem('menuCollapse') === 'true'
}
