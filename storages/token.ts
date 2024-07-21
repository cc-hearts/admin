import { localStorageCache } from './utils'
const TOKEN = 'token'
const REFRESH_TOKEN = 'refreshToken'

export const setToken = (token: string) => {
  localStorageCache.setItem(TOKEN, token)
}

export const getToken = () => {
  return localStorageCache.getItem(TOKEN)
}

export const setRefreshToken = (refreshToken: string) => {
  localStorageCache.setItem(REFRESH_TOKEN, refreshToken)
}

export const getRefreshToken = () => {
  return localStorageCache.getItem(REFRESH_TOKEN)
}

export const removeToken = () => {
  localStorageCache.removeItem(TOKEN)
}

export const removeRefreshToken = () => {
  localStorageCache.removeItem(REFRESH_TOKEN)
}
