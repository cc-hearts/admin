<script setup lang="ts">
import IPopover from '@/components/tooltip/IPopover'
import { collapsed } from '@/configs'
import LogOut from '@/icons/LogOut.vue'
import Module from '@/icons/module.vue'
import ConfigModal from '@/layouts/config/config-modal.vue'
import Headers from '@/layouts/header/headers.vue'
import SideMenu from '@/layouts/side/menu'
import { clearRefreshToken, clearToken } from '@/storage'
import { toggleOpenConfigModal } from '@/store/app'
import { getProfile } from '@/store/profile'
import { defineCssNamespace } from '@/utils'
import { Layout, Modal, Popover, Watermark } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { CcButton } from '@/components'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const router = useRouter()
const ns = defineCssNamespace('page-index')

const profile = getProfile()

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
const handleLogout = () => {
  Modal.confirm({
    title: t('components.headers.title'),
    content: t('components.headers.content'),
    okText: t('components.headers.okText'),
    cancelText: t('components.headers.cancelText'),
    onOk() {
      clearToken()
      clearRefreshToken()
      router.push('/login')
    },
  })
}
</script>
<template>
  <div class="h-full flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <Headers>
        <template #left>
          <div>
            <CcButton @click="toggleCollapsed">
              <MenuUnfoldOutlined v-if="collapsed" />
              <MenuFoldOutlined v-else />
            </CcButton>
          </div>
        </template>
        <template #right-icon>
          <IPopover :content="$t('common.config')">
            <Module @click="toggleOpenConfigModal" />
          </IPopover>

          <Popover
            :overlayClassName="ns.e('custom-popover')"
            placement="bottomRight"
          >
            <template #content>
              <div
                class="flex items-center"
                :class="[ns.e('popover')]"
                @click="handleLogout"
              >
                <LogOut />
                <div class="popover__split"></div>
                <span>{{ $t('common.logout') }}</span>
              </div>
            </template>
            <MoreOutlined />
          </Popover>
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

<style lang="scss">
@use '@/assets/scss/lib.scss' as *;

@include b('page-index') {
  @include e('custom-popover') {
    .ant-popover-inner {
      padding: 12px 6px;
    }
  }

  @include e('popover') {
    padding: 2px 4px;
    transition: all 0.3s;
    border-radius: 4px;
    cursor: pointer;
    color: var(--color-text-2);

    &:hover {
      background-color: var(--cc-popover-hover-bg-color);
      color: var(--color-text-1);
    }
  }
}
.popover__split {
  --cc-divider-light: rgba(60, 60, 60, 0.12);
  width: 1px;
  height: 16px;
  margin: 0 4px;
  border-right: 1px solid var(--cc-divider-light);
}

.dark {
  .popover__split {
    --cc-divider-light: rgba(84, 84, 84, 0.48);
  }
}
</style>

<route>
  {
    name: 'Home',
    meta:{
      hidden: true
    }
  }
</route>
@/layouts/side/menu
