import { localStorageCache } from '@/utils/define-storage'

export function setToken(token: string) {
  localStorageCache.setItem('token', token)
}

export function getToken() {
  return localStorageCache.getItem('token')
}

export function clearToken() {
  localStorageCache.removeItem('token')
}

export function setRefreshToken(token: string) {
  localStorageCache.setItem('refreshToken', token)
}

export function getRefreshToken() {
  return localStorageCache.getItem('refreshToken')
}

export function clearRefreshToken() {
  localStorageCache.removeItem('refreshToken')
}
