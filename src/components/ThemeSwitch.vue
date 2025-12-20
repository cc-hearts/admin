<script setup lang="ts">
import { Check, Moon, Sun } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useTheme, type Theme } from '@/composables/use-theme'
import { ref } from 'vue'

const { theme, setTheme } = useTheme()
const open = ref(false)
function choose(t: Theme) {
  setTheme(t)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="relative inline-flex size-8 w-[32px] h-[32px] p-[6px] items-center justify-center rounded-full hover:bg-muted"
      aria-label="Toggle theme"
      @click="open = !open"
    >
      <Sun
        class="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <Moon
        class="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
      <span class="sr-only">Toggle theme</span>
    </button>
    <div
      v-if="open"
      class="absolute right-0 z-30 mt-2 min-w-36 rounded-md border bg-popover text-popover-foreground shadow-md"
    >
      <button
        class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
        @click="choose('light')"
      >
        <span>Light</span>
        <Check
          size="14"
          :class="cn('ms-auto', theme.value !== 'light' && 'hidden')"
        />
      </button>
      <button
        class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
        @click="choose('dark')"
      >
        <span>Dark</span>
        <Check
          size="14"
          :class="cn('ms-auto', theme.value !== 'dark' && 'hidden')"
        />
      </button>
      <button
        class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
        @click="choose('system')"
      >
        <span>System</span>
        <Check
          size="14"
          :class="cn('ms-auto', theme.value !== 'system' && 'hidden')"
        />
      </button>
    </div>
  </div>
</template>
