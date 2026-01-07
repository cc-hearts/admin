<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { type Component, computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/composables/use-sidebar'

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>

interface Props {
  variant?: SidebarMenuButtonVariants['variant']
  size?: SidebarMenuButtonVariants['size']
  tooltip?: string | Component | { content: string } // 简化 tooltip 类型
  isActive?: boolean
  class?: string
  as?: string | Component
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
})

const sidebar = useSidebar()

const buttonClass = computed(() =>
  cn(
    sidebarMenuButtonVariants({ variant: props.variant, size: props.size }),
    props.class,
  ),
)

const tooltipContent = computed(() => {
  if (typeof props.tooltip === 'string') return props.tooltip
  if (typeof props.tooltip === 'object' && 'content' in (props.tooltip as any))
    return (props.tooltip as any).content
  return props.tooltip
})
</script>

<template>
  <component
    :is="as"
    v-if="!tooltip"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    :class="buttonClass"
    v-bind="$attrs"
  >
    <slot />
  </component>

  <Tooltip v-else>
    <TooltipTrigger as-child>
      <component
        :is="as"
        data-sidebar="menu-button"
        :data-size="size"
        :data-active="isActive"
        :class="buttonClass"
        v-bind="$attrs"
      >
        <slot />
      </component>
    </TooltipTrigger>
    <TooltipContent
      side="right"
      align="center"
      :hidden="sidebar?.state.value !== 'collapsed' || sidebar?.isMobile.value"
    >
      <template v-if="typeof tooltipContent === 'string'">{{
        tooltipContent
      }}</template>
      <component :is="tooltipContent" v-else />
    </TooltipContent>
  </Tooltip>
</template>
