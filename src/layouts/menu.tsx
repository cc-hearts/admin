import { useNamespace } from "@/hooks";
import { ItemType, Menu } from "ant-design-vue"
import '@/assets/scss/pages/menu.scss'
const menu: ItemType[] = reactive([
  { key: 'deploy', label: 'Deploy', },
]);

export const isCollapsed = ref(true);
export default defineComponent({
  name: "SideMenu",
  setup() {
    const ns = useNamespace('side-menu')
    return () => <nav class={(isCollapsed.value ? 'w-200px ' : "w-80px ") + 'h-full ' + ns.cls}>
      <Menu items={menu}>

      </Menu>
    </nav>
  }
})