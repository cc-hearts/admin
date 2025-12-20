<script setup lang="ts">
import { ref } from 'vue'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-vue-next'
import type { User } from './types'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/composables/use-sidebar'

const props = defineProps<{ user: User }>()
const { isMobile } = useSidebar() || {}
const open = ref(false)
</script>

<template>
  <div class="p-2">
    <div class="relative">
      <button
        @click="open = !open"
        :class="
          cn(
            'flex w-full items-center gap-2 rounded-md p-2 text-left text-sm transition',
            open && 'bg-sidebar-accent text-sidebar-accent-foreground',
          )
        "
      >
        <div class="h-8 w-8 overflow-hidden rounded-lg bg-muted">
          <img
            :src="props.user.avatar"
            :alt="props.user.name"
            class="h-8 w-8 object-cover"
          />
        </div>
        <div class="grid flex-1 text-start text-sm leading-tight">
          <span class="truncate font-semibold">{{ props.user.name }}</span>
          <span class="truncate text-xs">{{ props.user.email }}</span>
        </div>
        <ChevronsUpDown class="ms-auto size-4" />
      </button>

      <div
        v-if="open"
        class="absolute z-20 min-w-56 rounded-lg border bg-popover text-popover-foreground shadow-md"
        :class="isMobile ? 'left-0 top-full mt-1' : 'right-0 top-0 ms-1'"
      >
        <div class="p-2">
          <div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
            <div class="h-8 w-8 overflow-hidden rounded-lg bg-muted">
              <img
                :src="props.user.avatar"
                :alt="props.user.name"
                class="h-8 w-8 object-cover"
              />
            </div>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-semibold">{{ props.user.name }}</span>
              <span class="truncate text-xs">{{ props.user.email }}</span>
            </div>
          </div>
        </div>
        <div class="border-t" />
        <div class="py-1">
          <button
            class="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-muted"
          >
            <Sparkles class="size-4" />
            <span>Upgrade to Pro</span>
          </button>
        </div>
        <div class="border-t" />
        <div class="py-1">
          <a
            href="#settings/account"
            class="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-muted"
          >
            <BadgeCheck class="size-4" />
            <span>Account</span>
          </a>
          <a
            href="#settings"
            class="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-muted"
          >
            <CreditCard class="size-4" />
            <span>Billing</span>
          </a>
          <a
            href="#settings/notifications"
            class="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-muted"
          >
            <Bell class="size-4" />
            <span>Notifications</span>
          </a>
        </div>
        <div class="border-t" />
        <div class="py-1">
          <button
            class="flex w-full items-center gap-2 px-2 py-2 text-left text-sm text-destructive hover:bg-muted"
          >
            <LogOut class="size-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
