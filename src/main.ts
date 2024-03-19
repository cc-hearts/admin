import '@/assets/scss/reset.scss'
import '@/assets/scss/theme.scss'
import 'uno.css'
import './guards/router.guard'
import './modules/i18n'
import './mocks/index'
import { createApp } from 'vue'
import App from './App.vue'
import { install as installIcon } from '@/features/components/icon/install'

const app = createApp(App)

installIcon(app)

Object.entries(import.meta.glob('./modules/*.ts', { eager: true })).forEach(
  ([, Module]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Module.setup?.({ app })
  },
)

app.mount('#app')
