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
  <div class="h-full m-t-1px flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <Headers>
        <template #right-icon>
          <IPopover :content="$t('common.config')">
            <Module />
          </IPopover>
        </template>
      </Headers>
      <Watermark
        :content="[profile?.name]"
        class="border-box p-2 flex-1 bg-main overflow-auto"
      >
        <Layout class="bg-transparent">
          <router-view />
        </Layout>
      </Watermark>
    </div>
  </div>
</template>
<style lang="scss"></style>
