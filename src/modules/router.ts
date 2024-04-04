import { __IS_DEV__ } from '@/configs'
import { setRouter } from '@/configs/router.ts'
import { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import routePages from '~pages'

function setupRouter(routes: RouteRecordRaw[]) {
  const indexRoutes = routes.find((r) => r.path === '/')
  if (!indexRoutes) return []
  const childrenRoute = [] as RouteRecordRaw[],
    _routes = [] as RouteRecordRaw[]
  routes.forEach((route) => {
    if (route.path === '/') return

    if (route?.meta?.isolated) {
      _routes.push(route)
    } else {
      const newRoute = { ...route }
      childrenRoute.push(newRoute)
    }
  })

  Reflect.set(indexRoutes, 'children', childrenRoute)
  return [indexRoutes, ..._routes]
}

const routes = setupRouter(routePages)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
setRouter(router)
export const setup = ({ app }: { app: App }) => {
  if (__IS_DEV__) {
    console.log(routes)
  }

  app.use(router)
}
