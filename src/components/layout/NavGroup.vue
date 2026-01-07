<script setup lang="ts">
import { computed } from 'vue'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import { useSidebar } from '@/composables/use-sidebar'
import type {
  NavCollapsible,
  NavItemType,
  NavLink,
  NavGroup as NavGroupProps,
} from './types'

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
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ props.title }}</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in props.items" :key="item.title">
        <!-- Link Item -->
        <SidebarMenuItem v-if="!(item as NavCollapsible).items">
          <SidebarMenuButton
            :tooltip="item.title"
            :is-active="checkIsActive(href, item)"
            @click="go((item as NavLink).url)"
          >
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.title }}</span>
            <span
              v-if="item.badge"
              class="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium"
            >
              {{ item.badge }}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <!-- Collapsible Item (Collapsed & Desktop -> Dropdown) -->
        <SidebarMenuItem
          v-else-if="
            sidebar?.state.value === 'collapsed' && !sidebar?.isMobile.value
          "
        >
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                :tooltip="item.title"
                :is-active="checkIsActive(href, item)"
              >
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight class="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" :side-offset="4">
              <DropdownMenuLabel>
                {{ item.title }}
                <span v-if="item.badge">({{ item.badge }})</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                v-for="sub in (item as NavCollapsible).items"
                :key="sub.title"
                @select="go(sub.url)"
                :class="{ 'bg-muted': checkIsActive(href, sub) }"
              >
                <component :is="sub.icon" v-if="sub.icon" class="mr-2 size-4" />
                <span>{{ sub.title }}</span>
                <span v-if="sub.badge" class="ml-auto text-xs">{{
                  sub.badge
                }}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>

        <!-- Collapsible Item (Expanded or Mobile) -->
        <Collapsible
          v-else
          as-child
          :default-open="checkIsActive(href, item, true)"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton
                :tooltip="item.title"
                :is-active="checkIsActive(href, item)"
              >
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <span
                  v-if="item.badge"
                  class="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium"
                >
                  {{ item.badge }}
                </span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="sub in (item as NavCollapsible).items"
                  :key="sub.title"
                >
                  <SidebarMenuSubButton
                    :is-active="checkIsActive(href, sub)"
                    @click="go(sub.url)"
                  >
                    <component :is="sub.icon" v-if="sub.icon" />
                    <span>{{ sub.title }}</span>
                    <span
                      v-if="sub.badge"
                      class="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium"
                    >
                      {{ sub.badge }}
                    </span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
