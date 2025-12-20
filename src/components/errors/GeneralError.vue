<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    minimal?: boolean
    class?: string
  }>(),
  { minimal: false },
)

const goBack = () => window.history.back()
const goHome = () => (window.location.href = '/')
</script>

<template>
  <div :class="['h-svh w-full', props.class]">
    <div
      class="m-auto flex h-full w-full flex-col items-center justify-center gap-2"
    >
      <h1 v-if="!props.minimal" class="text-[7rem] leading-tight font-bold">
        500
      </h1>
      <span class="font-medium">Oops! Something went wrong :')</span>
      <p class="text-center text-muted-foreground">
        We apologize for the inconvenience. <br />
        Please try again later.
      </p>
      <div v-if="!props.minimal" class="mt-6 flex gap-4">
        <button
          class="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-muted"
          @click="goBack"
        >
          Go Back
        </button>
        <button
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm text-primary-foreground hover:opacity-90"
          @click="goHome"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>
