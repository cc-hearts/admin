import type { Router } from 'vue-router'

export let router: Router

export const setRouter = (_router: any) => {
  router = _router
}
