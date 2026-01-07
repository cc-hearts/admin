<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useSidebar, SIDEBAR_WIDTH_MOBILE } from '@/composables/use-sidebar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
    class?: string
  }>(),
  {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
  },
)

const sidebar = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    :class="
      cn(
        'flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet
    v-else-if="sidebar?.isMobile.value"
    :open="sidebar?.openMobile.value"
    @update:open="sidebar?.setOpenMobile"
    v-bind="$attrs"
  >
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      :class="
        cn(
          'w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden',
        )
      "
      :style="{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE }"
      :side="side"
    >
      <SheetHeader class="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="group peer hidden text-sidebar-foreground md:block"
    :data-state="sidebar?.state.value"
    :data-collapsible="sidebar?.state.value === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- Gap -->
    <div
      :class="
        cn(
          'duration-200 relative h-svh w-[var(--sidebar-width)] bg-transparent transition-[width] ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
            : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]',
        )
      "
    />
    <!-- Container -->
    <div
      :class="
        cn(
          'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
            : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l',
          props.class,
        )
      "
    >
      <div
        data-sidebar="sidebar"
        class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
