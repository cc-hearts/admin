import { isDev } from '@/configs'
import { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import { sysRouters } from '@/configs/router'

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
const filterRouteList = ['/login']

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

const _routes = setupRouter(routes.concat([notFoundRoutes]))
export const router = createRouter({
  history: createWebHashHistory(),
  routes: _routes,
})

export const setup = ({ app }: { app: App }) => {
  if (isDev) {
    console.log(_routes)
  }
  app.use(router)
}
