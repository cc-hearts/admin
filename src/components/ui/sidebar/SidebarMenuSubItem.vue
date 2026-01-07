<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <li :class="cn('group/menu-sub-item relative', props.class)">
    <slot />
  </li>
</template>
