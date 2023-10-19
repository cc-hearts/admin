import NProgress from 'nprogress'
import { router } from './router'
export const setup = () => {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
