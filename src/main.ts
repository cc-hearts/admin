import '@/assets/scss/reset.scss'
import '@/assets/scss/theme.scss'
import 'uno.css'
import './modules/i18n'
import './mocks/index'
import { createApp } from 'vue'
import App from './App.vue'
import { install as installIcon } from '@/features/components/icon/install'
import { setupRouterGuard } from './guards/router.guard'

const app = createApp(App)

installIcon(app)

Object.entries(import.meta.glob('./modules/*.ts', { eager: true }))
  .sort(([prevName], [nextName]) =>
    prevName.includes('router') || nextName.includes('router') ? -1 : 0,
  )
  .forEach(([, Module]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Module.setup?.({ app })
  })

setupRouterGuard()

app.mount('#app')
