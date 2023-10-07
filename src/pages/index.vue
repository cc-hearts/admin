<script setup lang='ts'>
import SideMenu from '@/layouts/menu'
</script>
<template>
  <div class="h-full m-t-1px flex">
    <SideMenu />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<style lang='scss'>

</style>
