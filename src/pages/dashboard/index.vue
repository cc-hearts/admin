<script setup lang="ts">
import { profile } from '@/store/profile'
import CurrentTime from '@/features/dashboard/components/current-time.vue'
</script>
<template>
  <a-row>
    <a-col :span="16">
      <a-card class="m-r-2">
        <!--  -->
        <div class="flex justify-between items-center">
          <h2>欢迎回来, {{ profile?.name }}</h2>
          <CurrentTime />
        </div>
      </a-card>
    </a-col>
    <a-col :span="8">
      <!--  -->
      <a-card>
        <a-calendar :fullscreen="false" />
      </a-card>
    </a-col>
  </a-row>
</template>
<style lang="scss"></style>
