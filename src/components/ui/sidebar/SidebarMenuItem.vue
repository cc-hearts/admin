<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <li
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative', props.class)"
  >
    <slot />
  </li>
</template>
