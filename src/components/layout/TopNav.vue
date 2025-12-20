<script setup lang="ts">
import { cn } from '@/lib/utils'

type LinkItem = {
  title: string
  href: string
  isActive: boolean
  disabled?: boolean
}

const props = defineProps<{
  links: LinkItem[]
  class?: string
}>()
</script>

<template>
  <!-- 简化版 TopNav：桌面端显示，移动端可后续增强为下拉 -->
  <nav :class="cn('hidden items-center space-x-4 lg:flex xl:space-x-6', props.class)">
    <a
      v-for="item in props.links"
      :key="`${item.title}-${item.href}`"
      :href="item.href"
      :aria-disabled="item.disabled"
      :class="
        cn(
          'text-sm font-medium transition-colors hover:text-primary',
          item.isActive ? '' : 'text-muted-foreground'
        )
      "
    >
      {{ item.title }}
    </a>
  </nav>
</template>
