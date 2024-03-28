import { __IS_DEV__ } from '@/configs'
import { sysRouters } from '@/configs/router'
import { setRouter } from '@/configs/router.ts'
import { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import routePages from '~pages'

const indexRoutes = {
  path: '/',
  name: 'home',
  component: () => import('@/pages/index.vue'),
}

const notFoundRoutes = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/components/not-found/not-found.vue'),
}
const filterRouteList = ['/login', '/:pathMatch(.*)*']

function setupRouter(routes: RouteRecordRaw[]) {
  const childrenRoute = [] as RouteRecordRaw[],
    _routes = [] as RouteRecordRaw[]
  routes.forEach((route) => {
    if (route.path === '/') return

    if (filterRouteList.includes(route.path)) {
      _routes.push(route)
    } else {
      childrenRoute.push(route)
    }
  })

  Reflect.set(indexRoutes, 'children', childrenRoute)
  return [indexRoutes, ..._routes, ...sysRouters]
}

const routes = setupRouter(routePages.concat([notFoundRoutes]))
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
