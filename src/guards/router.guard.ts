import { isDev } from '@/configs'
import { getProfile as fetchProfile } from '@/features/user/api'
import { router } from '@/modules/router'
import { getProfile, setProfile } from '@/store/profile'

router.beforeEach(async (to, from, next) => {
  // TODO
  if (isDev) {
    console.log('router.beforeEach', to, from)
  }
  if (getProfile() === null) {
    try {
      const { data } = await fetchProfile()
      data && setProfile(data)
    } catch (e) {
      console.log('e')
    }
  }
  next()
})
