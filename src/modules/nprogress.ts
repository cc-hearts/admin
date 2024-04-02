import NProgress from 'nprogress'
import { router } from '@/configs/router'

export const setup = () => {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
