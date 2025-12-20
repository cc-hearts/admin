<script setup lang="ts">
const goBack = () => window.history.back()
const goHome = () => (window.location.href = '/')
</script>

<template>
  <div class="h-svh">
    <div
      class="m-auto flex h-full w-full flex-col items-center justify-center gap-2"
    >
      <h1 class="text-[7rem] leading-tight font-bold">403</h1>
      <span class="font-medium">Access Forbidden</span>
      <p class="text-center text-muted-foreground">
        You don't have necessary permission <br />
        to view this resource.
      </p>
      <div class="mt-6 flex gap-4">
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
