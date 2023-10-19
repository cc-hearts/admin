import { Request } from '@cc-heart/utils-client'
import type { IBaseResponse } from '@/types'
import { getToken, getRefreshToken, setToken, setRefreshToken } from '@/storage'
import { errorMsg } from './message'
import { refreshTokenApi } from '@/features/user/api'
import { isDev } from '@/configs'
export type params = Record<string, any> | FormData

const config = {
  baseUrl: isDev ? location.origin : import.meta.env.VITE_BASE_URL,
  prefix: import.meta.env.VITE_PREFIX,
}
const request = new Request<IBaseResponse>(
  [config.baseUrl, config.prefix].join('/'),
)

async function getRouter() {
  return import('../modules/router')
}
request.useResponseInterceptor(async (data, { url, data: config }) => {
  const { message, code } = data
  const { router } = await getRouter()
  if ([200].includes(code)) {
    return Promise.resolve(data)
  }
  if ([401].includes(code)) {
    try {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        const { data } = await refreshTokenApi(refreshToken)
        if (data) {
          const { accessToken, refreshToken } = data
          setToken(accessToken)
          setRefreshToken(refreshToken)
        }
        const { data: _data } = await Promise.resolve(
          request.request(url, config.method, config.body, config.interceptor),
        )
        return Promise.resolve(_data)
      }
    } catch (error) {
      console.log(error)
    }
    router.push('/login')
    return
  }
  return Promise.reject(message)
})

request.useErrorInterceptor((error) => {
  errorMsg(error.toString())
  return Promise.reject(error)
})

request.useRequestInterceptor((config) => {
  const token = getToken()
  if (!config.headers) {
    config.headers = {}
  }
  if (token) config.headers['Authorization'] = `Bearer ${token}`
})

export default request

export function Get<T, U extends params = params>(
  url: string,
  params?: U,
  requestInit?: RequestInit,
) {
  return request.Get<IBaseResponse<T>>(url, params, requestInit)
}

export function Post<T, U extends params = params>(
  url: string,
  params?: U,
  requestInit?: RequestInit,
) {
  return request.Post<IBaseResponse<T>>(url, params, requestInit)
}

export function Put<T, U extends params = params>(
  url: string,
  params?: U,
  requestInit?: RequestInit,
) {
  return request.Put<IBaseResponse<T>>(url, params, requestInit)
}

export function Delete<T, U extends params = params>(
  url: string,
  params?: U,
  requestInit?: RequestInit,
) {
  return request.Delete<IBaseResponse<T>>(url, params, requestInit)
}
