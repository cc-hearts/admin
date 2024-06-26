import { __IS_DEV__ } from '@/configs'
import { getProfile as fetchProfile } from '@/features/user/api'
import { router } from '@/configs/router'
import { getProfile, setProfile } from '@/store/profile'

export function setupRouterGuard() {
  router.beforeEach(async (to, from, next) => {
    // TODO
    if (__IS_DEV__) {
      console.log('router.beforeEach', to, from)
    }
    if (to.path === '/login') {
      next()
      return
    }
    if (getProfile() === null) {
      try {
        const { data } = await fetchProfile()
        data && setProfile(data)
      } catch (e) {
        console.log('fetch profile failed:' + e)
      }
    }

    next()
  })
}
