<script setup lang="ts">
import SideBar from './layouts/sidebar/index.vue';
</script>

<template>
    <SideBar>
        <div class="flex-1"></div>
    </SideBar>
</template>

<style>
html,
body,
#app {
    height: 100%;
    width: 100%;
}

* {
    box-sizing: border-box;
}
</style>
