import { Get, Post } from '@/utils/request.ts'
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

export async function refreshTokenApi(refreshToken: string) {
  const { data } = Post<ILoginApi>(`${prefix}/user/refresh`, {
    refreshToken,
  })
  return data
}
