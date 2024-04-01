import { RouteRecordRaw, Router } from 'vue-router'

export const sysRouters: RouteRecordRaw[] = [
  // {
  //   name: 'Organizational structure',
  //   path: '/sys',
  //   meta: {
  //     // TODO 定义语言包
  //   },
  //   // component: () => import('@/pages/sys/index.vue'),
  //   children: [],
  // },
]

export let router: Router

export const setRouter = (_router: any) => {
  router = _router
}
