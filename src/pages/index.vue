<script setup lang="ts">
import IPopover from '@/components/header/IPopover'
import Headers from '@/components/header/headers.vue'
import Module from '@/icons/module.vue'
import SideMenu from '@/layouts/menu'
import { getProfile } from '@/store/profile'
import { Watermark, Layout } from 'ant-design-vue'

const profile = getProfile()
</script>
<template>
  <Watermark
    :content="profile?.name || 'carl chen'"
    class="h-full p-2 flex-1 bg-main overflow-auto"
  >
    <Layout class="bg-transparent">
      <router-view />
    </Layout>
  </Watermark>
</template>
