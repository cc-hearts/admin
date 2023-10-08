import { useNamespace } from "@/hooks";
import { ItemType, Menu } from "ant-design-vue"
import { MenuInfo } from "ant-design-vue/es/menu/src/interface";
import { useRouter } from "vue-router";

import '@/assets/scss/pages/menu.scss'

const menu: ItemType[] = reactive([
  { key: 'deploy', label: 'Deploy' },
]);

export const isCollapsed = ref(true);
export default defineComponent({
  name: "SideMenu",
  setup() {
    const ns = useNamespace('side-menu')
    const router = useRouter()
    const handleClickMenu = (params: MenuInfo) => {
      const { key } = params
      router.push(key as string)
    }
    return () => <nav class={(isCollapsed.value ? 'w-200px ' : "w-80px ") + 'h-full ' + ns.cls}>
      <Menu items={menu} onClick={handleClickMenu}></Menu>
    </nav>
  }
})