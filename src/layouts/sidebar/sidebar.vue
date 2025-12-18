<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  useSidebar,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_WIDTH_MOBILE,
} from '@/composables/use-sidebar'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

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
  }
)

const ctx = useSidebar()
</script>

<template>
  <!-- 不可折叠分支 -->
  <div
    v-if="props.collapsible === 'none'"
    data-slot="sidebar"
    :class="cn('flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground', props.class)"
    :style="{ '--sidebar-width': SIDEBAR_WIDTH }"
  >
    <slot />
  </div>

  <!-- 移动端抽屉 -->
  <Sheet v-else-if="ctx?.isMobile?.value" :open="ctx.openMobile.value" @update:open="ctx.setOpenMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :class="cn('w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden')"
      :style="{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE }"
      :side="props.side"
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

  <!-- 桌面端 -->
  <div
    v-else
    class="group peer hidden text-sidebar-foreground md:block"
    :data-state="ctx?.state?.value"
    :data-collapsible="ctx?.state?.value === 'collapsed' ? props.collapsible : ''"
    :data-variant="props.variant"
    :data-side="props.side"
    data-slot="sidebar"
  >
    <!-- gap -->
    <div
      data-slot="sidebar-gap"
      :class="cn(
        'relative bg-transparent transition-[width] duration-200 ease-linear',
        'w-[var(--sidebar-width)]',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        props.variant === 'floating' || props.variant === 'inset'
          ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]'
      )"
      :style="{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON }"
    />

    <!-- container -->
    <div
      data-slot="sidebar-container"
      :class="cn(
        'fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[inset-inline,width] duration-200 ease-linear md:flex',
        props.side === 'left'
          ? 'start-0 group-data-[collapsible=offcanvas]:-start-[calc(var(--sidebar-width))]'
          : 'end-0 group-data-[collapsible=offcanvas]:-end-[calc(var(--sidebar-width))]',
        props.variant === 'floating' || props.variant === 'inset'
          ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
          : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-e group-data-[side=right]:border-s',
        props.class
      )"
      :style="{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON }"
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
      >
        <slot />
      </div>
    </div>

    <!-- rail -->
    <!-- <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabindex="-1"
      @click="ctx?.toggleSidebar?.()"
      title="Toggle Sidebar"
      :class="cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-end-4 group-data-[side=right]:start-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:start-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-end-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-start-2',
        'rtl:translate-x-1/2',
        'rtl:in-data-[side=left]:cursor-e-resize rtl:in-data-[side=right]:cursor-w-resize',
        'rtl:[[data-side=left][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=right][data-state=collapsed]_&]:cursor-e-resize'
      )"
    /> -->
  </div>
</template>
