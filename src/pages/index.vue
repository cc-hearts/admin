<script setup lang='ts'>
import SideMenu from '@/layouts/menu'
import Headers from "@/components/header/headers.vue";

</script>
<template>
  <div class="h-full m-t-1px flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <Headers  />
      <div class="p-2 flex-1">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang='scss'>

</style>
