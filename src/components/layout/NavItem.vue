<script setup lang="ts">
import type { Component } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    title: string
    icon?: Component
    badge?: string | number
    active?: boolean
    variant?: 'full' | 'compact' | 'icon-only' | 'popover'
    class?: string
    titleAttr?: string
  }>(),
  {
    active: false,
    variant: 'full',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
  emit('click')
}

const baseClassMap: Record<NonNullable<typeof props.variant>, string> = {
  full: 'flex w-full items-center gap-2 overflow-hidden rounded-md text-start text-sm outline-hidden ring-sidebar-ring transition cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>span:last-child]:truncate',
  compact:
    'flex w-full items-center gap-2 rounded-md p-2 text-start text-sm transition cursor-pointer hover:bg-muted',
  'icon-only':
    'flex w-full items-center justify-center rounded-md text-sm transition cursor-pointer hover:bg-muted',
  popover:
    'flex w-full items-center gap-2 px-2 py-2 text-left text-sm cursor-pointer transition hover:bg-muted',
}

const badgeClassMap: Record<NonNullable<typeof props.variant>, string> = {
  full: 'ms-auto rounded-full px-1 py-0 text-xs border bg-muted',
  compact: 'ms-auto rounded-full px-1 py-0 text-xs border bg-muted',
  'icon-only': 'hidden',
  popover: 'ms-auto text-xs',
}
</script>

<template>
  <button
    :class="
      cn(baseClassMap[props.variant!], props.active && 'bg-muted', props.class)
    "
    @click="onClick"
    :title="props.titleAttr ?? props.title"
  >
    <div
      v-if="props.icon"
      class="flex aspect-square size-8 items-center justify-center rounded-md"
    >
      <component :is="props.icon" class="size-4 shrink-0" />
    </div>
    <span v-if="props.variant !== 'icon-only'">{{ props.title }}</span>
    <span
      v-if="props.badge && badgeClassMap[props.variant!] !== 'hidden'"
      :class="badgeClassMap[props.variant!]"
    >
      {{ props.badge }}
    </span>
    <slot name="end" />
  </button>
</template>
