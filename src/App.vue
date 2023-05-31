<script setup lang="ts">
import Headers from "@/components/header/headers.vue";
import Home from "@/layouts/home";
import Button from "./components/button/button.vue";
</script>

<template>
  <Headers />
  <Home> </Home>
  <Button>default</Button>
  <Button type="primary">primary</Button>
  <Button type="dashed">dashed</Button>
  <Button type="danger">danger</Button>
  <Button type="flat">flat</Button>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html,
#app {
  width: 100%;
  height: 100%;
}
</style>
