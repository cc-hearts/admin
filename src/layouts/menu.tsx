import '@/assets/scss/pages/menu.scss'
import { collapsed, defaultMenuIconName } from '@/configs'
import { getIconFunc } from '@/features/components/icon/install'
import { getMenuTree, type IMenuTree } from '@/features/sys/apis'
import { useNamespace } from '@/hooks'
import { ItemType, Menu } from 'ant-design-vue'
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useRouter } from 'vue-router'
import { CustomerComponent } from '@/types/component'
import { VNode } from 'vue'

type MenuTree = ItemType & {
  children?: ItemType[]
}

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
      menu: [] as ItemType[],
    })

    function renderIcon(name: string): VNode {
      const Comp = (getIconFunc(name) ||
        getIconFunc(defaultMenuIconName)) as CustomerComponent
      if (Comp) return <Comp />
      return null as unknown as VNode
    }

    function traverseMenu(menu: IMenuTree[]): MenuTree[] {
      return menu
        .filter((target) => !target?.meta?.hidden)
        .map((item) => {
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
      }
    })

    return () => (
      <nav
        class={
          (collapsed.value ? 'w-200px ' : 'w-80px ') +
          'h-full shrink-0 ' +
          ns.cls
        }
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
