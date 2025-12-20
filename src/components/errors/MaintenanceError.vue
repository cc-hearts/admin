<script setup lang="ts">
const learnMore = () => alert('Maintenance info placeholder')
</script>

<template>
  <div class="h-svh">
    <div
      class="m-auto flex h-full w-full flex-col items-center justify-center gap-2"
    >
      <h1 class="text-[7rem] leading-tight font-bold">503</h1>
      <span class="font-medium">Website is under maintenance!</span>
      <p class="text-center text-muted-foreground">
        The site is not available at the moment. <br />
        We'll be back online shortly.
      </p>
      <div class="mt-6 flex gap-4">
        <button
          class="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-muted"
          @click="learnMore"
        >
          Learn more
        </button>
      </div>
    </div>
  </div>
</template>
