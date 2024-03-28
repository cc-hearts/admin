<script setup lang="ts">
import { getProfile } from '@/store/profile'
import { Watermark, Layout } from 'ant-design-vue'
import SideMenu from '@/layouts/menu'
import Headers from '@/layouts/headers.vue'
import IPopover from '@/components/tooltip/IPopover'
import Module from '@/icons/module.vue'

const profile = getProfile()
</script>
<template>
  <div class="h-full flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <Headers>
        <template #right-icon>
          <IPopover :content="$t('common.config')">
            <Module />
          </IPopover>
        </template>
      </Headers>
      <div class="flex-1">
        <Watermark :content="profile?.name || 'carl chen'" class="h-full p-2 flex-1 bg-main overflow-auto">
          <Layout class="bg-transparent">
            <router-view />
          </Layout>
        </Watermark>
      </div>
    </div>
  </div>
</template>