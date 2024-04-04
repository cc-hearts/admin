<script setup lang="ts">
import { getProfile } from '@/store/profile'
import { Watermark, Layout } from 'ant-design-vue'
import SideMenu from '@/layouts/side/menu'
import Headers from '@/layouts/header/headers.vue'
import IPopover from '@/components/tooltip/IPopover'
import Module from '@/icons/module.vue'
import { toggleOpenConfigModal } from '@/store/app'
import ConfigModal from '@/layouts/config/config-modal.vue'

const profile = getProfile()
</script>
<template>
  <div class="h-full flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <Headers>
        <template #right-icon>
          <IPopover :content="$t('common.config')">
            <Module @click="toggleOpenConfigModal" />
          </IPopover>
        </template>
      </Headers>
      <div class="flex-1">
        <Watermark
          :content="profile?.name || 'carl chen'"
          class="h-full p-2 flex-1 bg-main overflow-auto"
        >
          <Layout class="bg-transparent">
            <RouterView />
          </Layout>
        </Watermark>
      </div>
    </div>
  </div>
  <ConfigModal />
</template>

<route>
  {
    name: 'Home',
    meta:{
      hidden: true
    }
  }
</route>
@/layouts/side/menu
