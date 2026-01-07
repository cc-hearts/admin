<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Primitive } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    class?: string
    asChild?: boolean
  }>(),
  {
    asChild: false,
  },
)
</script>

<template>
  <Primitive
    data-sidebar="group-label"
    :as-child="asChild"
    :as="asChild ? undefined : 'div'"
    :class="
      cn(
        'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
