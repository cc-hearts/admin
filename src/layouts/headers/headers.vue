<script setup lang="ts">
import { collapsed, githubUrl } from '@/configs'
import { useNamespace } from '@/hooks'
import { GithubIcon } from '@/icons'
import LogOut from '@/icons/LogOut.vue'
import ArrowUp from '@/icons/arrowUp.vue'
import I18n from '@/icons/i18n.vue'
import { loadLanguageAsync } from '@/modules/i18n'
import { clearRefreshToken, clearToken } from '@/storage'
import { setLocates } from '@/storage/locates'
import { type Locales } from '@/types/config'
import { successTips } from '@/utils/message'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
} from '@ant-design/icons-vue'
import { Modal, Popover } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import SwitchTheme from '../switch/toggleDark.vue'
import IPopover from '@/components/i-popover/IPopover'

const router = useRouter()
const ns = useNamespace('header')
const toGithub = () => {
  if (githubUrl) window.open(githubUrl)
}
const { t } = useI18n()
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

const locates = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
] as const

const handleToggleLocates = async (value: Locales) => {
  await loadLanguageAsync(value)
  setLocates(value)
  successTips(t('components.headers.toggleLocatesSuccessMsg'))
}

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <header
    class="flex justify-between items-center px-3 shrink-0"
    :class="[ns.cls]"
  >
    <slot name="left">
      <div>
        <a-button @click="toggleCollapsed">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
      </div>
    </slot>
    <div class="flex text-xl items-center" :class="[ns.e('icon')]">
      <slot name="right-icon"></slot>
      <IPopover content="github">
        <GithubIcon @click="toGithub" />
      </IPopover>
      <SwitchTheme />
      <div :class="[ns.e('split')]">
        <Popover>
          <template #content>
            <template v-for="item in locates" :key="item.value">
              <div
                class="cursor-pointer m-y-1 justify-center p-x-2 flex items-center"
                :class="[ns.e('popover')]"
                @click="handleToggleLocates(item.value)"
              >
                <span>{{ item.label }}</span>
                <ArrowUp />
              </div>
            </template>
          </template>
          <I18n />
        </Popover>
      </div>
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
    </div>
  </header>
</template>

<style lang="scss">
@use '@/assets/scss/lib.scss' as *;

@include b('header') {
  --header-shadow: rgb(229, 230, 235);
  --icon-background-color: rgba(0, 0, 0, 0.1);
  --cc-divider-light: rgba(60, 60, 60, 0.12);
  height: 48px;
  box-shadow: 0 1px 0 var(--header-shadow);

  &__icon {
    color: var(--color-text-2);

    & > div,
    & > button,
    & > span > svg {
      margin: 0 0.2rem;
    }

    & > span {
      box-sizing: content-box;
      padding: 0.3rem;
      transition: all 0.3s;
      border-radius: 4px;

      &:hover {
        background-color: var(--icon-background-color);
      }
    }

    svg {
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: var(--color-text-1);
      }
    }
  }

  &__split {
    $marginX: 9px;
    display: flex;

    &::before,
    &::after {
      content: '';
      height: 24px;
    }

    &::before {
      margin-right: $marginX;
      border-right: 1px solid var(--cc-divider-light);
    }

    &::after {
      margin-left: $marginX;
      border-left: 1px solid var(--cc-divider-light);
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

  @include e('custom-popover') {
    .ant-popover-inner {
      padding: 12px 6px;
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
  @include b('header') {
    --header-shadow: rgb(72, 72, 73);
    --icon-background-color: rgba(255, 255, 255, 0.12);
    --cc-divider-light: rgba(84, 84, 84, 0.48);
  }

  .popover__split {
    --cc-divider-light: rgba(84, 84, 84, 0.48);
  }
}
</style>
