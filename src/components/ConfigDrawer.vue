<script setup lang="ts">
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { useLayout, type Collapsible, type Variant } from '@/composables/use-layout'

const layout = useLayout()
function setVariant(v: Variant) {
  layout?.setVariant(v)
  debugger
}
function setCollapsible(c: Collapsible) {
  layout?.setCollapsible(c)
}
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <button class="rounded-full border px-3 py-1 text-sm">设置</button>
    </SheetTrigger>
    <SheetContent class="flex flex-col">
      <SheetHeader class="pb-0 text-start">
        <SheetTitle>Sidebar 设置</SheetTitle>
        <SheetDescription>切换侧栏变体与折叠策略</SheetDescription>
      </SheetHeader>
      <div class="space-y-6 overflow-y-auto px-4 py-2">
        <div>
          <div class="mb-2 text-sm font-semibold text-muted-foreground">Sidebar</div>
          <div class="grid max-w-md grid-cols-3 gap-2">
            <button
              class="rounded-[6px] border px-2 py-2 text-xs"
              :class="layout?.variant?.value === 'inset' && 'ring-2 ring-primary'"
              @click="setVariant('inset')"
            >
              Inset
            </button>
            <button
              class="rounded-[6px] border px-2 py-2 text-xs"
              :class="layout?.variant?.value === 'floating' && 'ring-2 ring-primary'"
              @click="setVariant('floating')"
            >
              Floating
            </button>
            <button
              class="rounded-[6px] border px-2 py-2 text-xs"
              :class="layout?.variant?.value === 'sidebar' && 'ring-2 ring-primary'"
              @click="setVariant('sidebar')"
            >
              Sidebar
            </button>
          </div>
        </div>
        <div>
          <div class="mb-2 text-sm font-semibold text-muted-foreground">Layout</div>
          <div class="grid max-w-md grid-cols-3 gap-2">
            <button
              class="rounded-[6px] border px-2 py-2 text-xs"
              :class="(layout?.collapsible?.value ?? 'icon') === 'icon' && 'ring-2 ring-primary'"
              @click="setCollapsible('icon')"
            >
              Compact
            </button>
            <button
              class="rounded-[6px] border px-2 py-2 text-xs"
              :class="layout?.collapsible?.value === 'offcanvas' && 'ring-2 ring-primary'"
              @click="setCollapsible('offcanvas')"
            >
              Full
            </button>
            <button
              class="rounded-[6px] border px-2 py-2 text-xs"
              :class="layout?.collapsible?.value === 'none' && 'ring-2 ring-primary'"
              @click="setCollapsible('none')"
            >
              None
            </button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

