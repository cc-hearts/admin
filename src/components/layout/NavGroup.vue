<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useSidebar } from '@/composables/use-sidebar'
import type {
  NavCollapsible,
  NavItemType,
  NavLink,
  NavGroup as NavGroupProps,
} from './types'
import { cn } from '@/lib/utils'
import NavItem from './NavItem.vue'

const props = defineProps<NavGroupProps>()

const sidebar = useSidebar()
const href = computed(() =>
  typeof window !== 'undefined' ? window.location.hash || '#' : '#',
)

function checkIsActive(h: string, item: NavItemType, mainNav = false) {
  const _href = h.replace('#', '')
  const itemUrl = (item as any).url?.replace('#', '') || ''
  return (
    _href === itemUrl ||
    _href.split('?')[0] === itemUrl ||
    !!(item as NavCollapsible)?.items?.filter(
      (i) => i.url.replace('#', '') === _href,
    ).length ||
    (mainNav &&
      _href.split('/')[0] !== '' &&
      _href.split('/')[0] === itemUrl.split('/')[0])
  )
}

function go(to: string) {
  const hash = to.startsWith('#') ? to : `#${to}`
  window.location.hash = hash.replace('#', '')
  sidebar?.setOpenMobile(false)
  openMap.value = {}
}

const openMap = ref<Record<string, boolean>>({})
function setOpenFor(key: string, val: boolean) {
  openMap.value[key] = val
}

function getKey(item: NavItemType) {
  const url = (item as any).url as string | undefined
  const id = url ? url.replace('#', '') : item.title
  return `${props.title}:${id}`
}

const rootEl = ref<HTMLElement | null>(null)
let onDocClick: ((e: MouseEvent) => void) | null = null

onMounted(() => {
  onDocClick = (e: MouseEvent) => {
    const el = rootEl.value
    if (!el) return
    if (!el.contains(e.target as Node)) {
      openMap.value = {}
    }
  }
  document.addEventListener('click', onDocClick!, { capture: true })
})
onBeforeUnmount(() => {
  if (onDocClick) {
    document.removeEventListener('click', onDocClick, { capture: true } as any)
  }
})

watch(
  () => sidebar?.state?.value,
  (val) => {
    if (val !== 'collapsed') {
      openMap.value = {}
    }
  },
)
</script>

<template>
  <div class="px-2" ref="rootEl">
    <div
      v-if="sidebar?.state?.value !== 'collapsed' || sidebar?.isMobile?.value"
      class="px-2 py-1 text-xs font-medium text-muted-foreground"
    >
      {{ props.title }}
    </div>
    <ul class="flex w-full min-w-0 flex-col gap-1">
      <li
        v-for="item in props.items"
        :key="getKey(item)"
        class="group relative"
      >
        <!-- 链接项 -->
        <template v-if="!(item as NavCollapsible).items">
          <template
            v-if="
              sidebar?.state?.value !== 'collapsed' || sidebar?.isMobile?.value
            "
          >
            <NavItem
              :title="item.title"
              :icon="item.icon"
              :badge="item.badge"
              :active="checkIsActive(href, item as NavLink)"
              variant="full"
              @click="go((item as NavLink).url)"
            />
          </template>
          <template v-else>
            <NavItem
              :title="item.title"
              :icon="item.icon"
              :active="checkIsActive(href, item as NavLink)"
              variant="icon-only"
              :titleAttr="item.title"
              @click="go((item as NavLink).url)"
            />
          </template>
        </template>

        <!-- 可折叠项（展开态） -->
        <template
          v-else-if="
            sidebar?.state?.value !== 'collapsed' || sidebar?.isMobile?.value
          "
        >
          <div>
            <NavItem
              :title="item.title"
              :icon="item.icon"
              :badge="item.badge"
              :active="
                openMap[getKey(item)] ??
                checkIsActive(href, item as NavCollapsible, true)
              "
              variant="compact"
              :titleAttr="item.title"
              @click="
                setOpenFor(
                  getKey(item),
                  !(
                    openMap[getKey(item)] ??
                    checkIsActive(href, item as NavCollapsible, true)
                  ),
                )
              "
            >
              <template #end>
                <ChevronRight
                  class="ms-auto transition-transform w-[16px] mr-2 h-[16px] duration-200"
                  :class="
                    (openMap[getKey(item)] ??
                    checkIsActive(href, item as NavCollapsible, true))
                      ? 'rotate-90 rtl:rotate-180'
                      : ''
                  "
                />
              </template>
            </NavItem>
            <transition name="collapse">
              <div
                v-show="
                  openMap[getKey(item)] ??
                  checkIsActive(href, item as NavCollapsible, true)
                "
                class="ps-6 overflow-hidden"
              >
                <ul class="flex w-full min-w-0 flex-col gap-1">
                  <li
                    v-for="sub in (item as NavCollapsible).items"
                    :key="sub.title"
                  >
                    <NavItem
                      :title="sub.title"
                      :icon="sub.icon"
                      :badge="sub.badge"
                      :active="checkIsActive(href, sub)"
                      variant="compact"
                      @click="go(sub.url)"
                    />
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </template>

        <!-- 收缩态：下拉菜单 -->
        <template v-else>
          <div class="relative">
            <NavItem
              :title="item.title"
              :icon="item.icon"
              :active="checkIsActive(href, item as NavCollapsible)"
              variant="icon-only"
              :titleAttr="item.title"
              @click="
                setOpenFor(getKey(item), !(openMap[getKey(item)] ?? false))
              "
            />
            <transition name="fade-scale">
              <div
                v-show="openMap[getKey(item)]"
                class="absolute left-full top-0 z-30 ms-1 min-w-56 rounded-lg border bg-popover text-popover-foreground shadow-md"
              >
                <div class="px-2 py-1.5 text-xs">
                  {{ item.title
                  }}<span v-if="item.badge"> ({{ item.badge }})</span>
                </div>
                <div class="border-t" />
                <div class="py-1">
                  <NavItem
                    v-for="sub in (item as NavCollapsible).items"
                    :key="`${sub.title}-${sub.url}`"
                    :title="sub.title"
                    :icon="sub.icon"
                    :badge="sub.badge"
                    :active="checkIsActive(href, sub)"
                    variant="popover"
                    @click="go(sub.url)"
                  />
                </div>
              </div>
            </transition>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition:
    max-height 0.2s ease,
    opacity 0.2s ease;
}
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
