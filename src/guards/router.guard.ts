import { isDev } from '@/configs'
import { getProfile } from '@/features/user/api'
import { router } from '@/modules/router'

router.beforeEach((to, from, next) => {
  // TODO
  if (isDev) {
    console.log('router.beforeEach', to, from)
  }
  getProfile()
  next()
})
