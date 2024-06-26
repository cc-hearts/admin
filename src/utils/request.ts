import { __IS_DEV__ } from '@/configs'
import { refreshTokenApi } from '@/features/user/api'
import {
  clearRefreshToken,
  clearToken,
  getRefreshToken,
  getToken,
  setRefreshToken,
  setToken,
} from '@/storage'
import { clearProfile } from '@/store/profile'
import type { IBaseResponse } from '@/types'
import { Request } from '@cc-heart/utils-client'
import { errorMsg, successMsg } from './message'
export type params = Record<string, any> | FormData

const config = {
  baseUrl: __IS_DEV__ ? location.origin : import.meta.env.VITE_BASE_URL,
  prefix: import.meta.env.VITE_PREFIX,
}
const request = new Request<IBaseResponse>(
  [config.baseUrl, config.prefix].join('/'),
)

const tipsPathList = ['add', 'delete', 'update', 'edit']

export async function getRouter() {
  return import('../configs/router')
}
request.useResponseInterceptor(async (data, { url, data: config }) => {
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  const { message, code } = data
  const { router } = await getRouter()
  if ([200].includes(code)) {
    const { pathname } = new URL(url)
    const [path] = pathname.split('/').slice(-1)
    if (tipsPathList.includes(path)) {
      successMsg(message)
    }
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

        if (
          config.headers['Content-type'] === 'application/json' &&
          typeof config.body === 'string'
        ) {
          try {
            config.body = JSON.parse(config.body)
          } catch (error) {
            console.log('[refresh request parse config body] :', error)
          }
        }

        const { data: _data } = request.request(
          url,
          config.method,
          config.body,
          config.interceptor,
        )

        return Promise.resolve(_data)
      }
    } catch (error) {
      clearToken()
      clearRefreshToken()
      clearProfile()
      console.log('fetch request error:' + error)
    }
    router.push('/login')
    return
  }
  return Promise.reject(message)
})

request.useErrorInterceptor((error) => {
  if (error) errorMsg(error.toString())
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
