import { Get, Post } from '@/utils/request.ts'
import type { ILoginApi, ILoginParams, Profile } from './types'

export async function loginApi<T extends ILoginParams>(data: T) {
  const resultApi = Post<ILoginApi>(`user/login`, data)
  return await resultApi.data
}

export async function getProfile() {
  const { data } = Get<Profile>(`user/userInfo`)
  return data
}

export async function refreshTokenApi(refreshToken: string) {
  const { data } = Post<ILoginApi>(`user/refresh`, {
    refreshToken,
  })
  return data
}
