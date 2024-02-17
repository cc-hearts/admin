import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    AutoImport({
      imports: ['vue'],
      dts: './src/auto-import.d.ts', //避免ts报错问题
      eslintrc: {
        enabled: true,
      },
    }),
    vueJsx(),
    UnoCSS(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api/rbac': {
        target: 'http://114.55.225.186:30001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rbac/, ''),
      },
      '/api/deploy': {
        target: 'http://localhost:30003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deploy/, ''),
      },
    },
  },
})
