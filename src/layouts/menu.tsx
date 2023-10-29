import '@/assets/scss/pages/menu.scss'
import { collapsed, defaultMenuIconName } from '@/configs'
import { getIconFunc } from '@/features/components/icon/install'
import { getMenuTree, type IMenuTree } from '@/features/sys/apis'
import { useNamespace } from '@/hooks'
import { Menu } from 'ant-design-vue'
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useRouter } from 'vue-router'
import { CustomerComponent } from '@/types/component'
export default defineComponent({
  name: 'SideMenu',
  setup() {
    const ns = useNamespace('side-menu')
    const router = useRouter()
    const handleClickMenu = (params: MenuInfo) => {
      const { key } = params
      router.push(key as string)
    }
    const state = reactive({
      menu: [] as MenuTree[],
    })

    function renderIcon(name: string) {
      const Comp = (getIconFunc(name) ||
        getIconFunc(defaultMenuIconName)) as CustomerComponent
      if (Comp) return <Comp />
      return null
    }

    interface MenuTree {
      key: string | number
      label: string
      icon?: () => JSX.Element | null
      children?: MenuTree[]
    }
    function traverseMenu(menu: IMenuTree[]): MenuTree[] {
      return menu.map((item) => {
        const target: MenuTree = {
          key: item.path || item.id,
          label: item.name,
          icon: () => renderIcon(item.icon),
        }
        if (item.children) {
          target.children = traverseMenu(item.children)
        }
        return target
      })
    }
    getMenuTree().then((res) => {
      const { data } = res
      if (data) {
        state.menu = shallowReactive(traverseMenu(data))
        console.log(state.menu)
      }
    })
    return () => (
      <nav
        class={(collapsed.value ? 'w-200px ' : 'w-80px ') + 'h-full ' + ns.cls}
      >
        <Menu
          items={state.menu}
          mode="inline"
          inline-collapsed={!collapsed.value}
          onClick={handleClickMenu}
        ></Menu>
      </nav>
    )
  },
})
