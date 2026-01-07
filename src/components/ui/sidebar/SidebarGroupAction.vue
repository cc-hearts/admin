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
    data-sidebar="group-action"
    :as-child="asChild"
    :as="asChild ? undefined : 'button'"
    :class="
      cn(
        'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
