import type { Profile } from '@/features/user/types'

export const profile = ref<Profile | null>(null)

export function setProfile(data: Profile) {
  profile.value = data
}

export function getProfile() {
  return profile.value
}

export function clearProfile() {
  profile.value = null
}
