<script setup lang="ts">
import { profile } from '@/store/profile'
import CurrentTime from '@/features/dashboard/components/current-time.vue'
import { CcCard, CcCol, CcRow, CcCalendar } from '@/components'
</script>

<template>
  <CcRow>
    <CcCol :span="16">
      <CcCard class="m-r-2">
        <div class="flex justify-between items-center">
          <h2>欢迎回来, {{ profile?.name }}</h2>
          <CurrentTime />
        </div>
      </CcCard>
    </CcCol>
    <CcCol :span="8">
      <CcCard>
        <CcCalendar :fullscreen="false" />
      </CcCard>
    </CcCol>
  </CcRow>
</template>
<style lang="scss"></style>
