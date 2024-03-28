import { Get, Post } from '@/utils/request'
import type { ILoginApi, ILoginParams, Profile } from './types'

const prefix = 'api/rbac'
export async function loginApi<T extends ILoginParams>(data: T) {
  const resultApi = Post<ILoginApi>(`${prefix}/user/login`, data)
  return await resultApi.data
}

export async function getProfile() {
  const { data } = Get<Profile>(`${prefix}/user/userInfo`)
  return data
}

let refreshTokenInstance: ReturnType<typeof Post<ILoginApi>>['data'] | null =
  null
export async function refreshTokenApi(refreshToken: string) {
  if (refreshTokenInstance !== null) return refreshTokenInstance
  const { data } = Post<ILoginApi>(`${prefix}/user/refresh`, {
    refreshToken,
  })
  refreshTokenInstance = data
  refreshTokenInstance.finally(() => {
    refreshTokenInstance = null
  })
  return refreshTokenInstance
}
