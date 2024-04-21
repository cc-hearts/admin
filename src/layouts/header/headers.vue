<script setup lang="ts">
import IPopover from '@/components/tooltip/IPopover'
import { githubUrl } from '@/configs'
import { defineNamespace } from '@/hooks'
import { GithubIcon } from '@/icons'
import ArrowUp from '@/icons/arrowUp.vue'
import I18n from '@/icons/i18n.vue'
import SwitchTheme from '@/layouts/config/theme/toggleDark.vue'
import { loadLanguageAsync } from '@/modules/i18n'
import { setLocates } from '@/storage'
import { Locales } from '@/types'
import { successTips } from '@/utils'
import { Popover } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const ns = defineNamespace('header')
const locates = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
] as const

const handleToggleLocates = async (value: Locales) => {
  await loadLanguageAsync(value)
  setLocates(value)
  successTips(t('components.headers.toggleLocatesSuccessMsg'))
}

const toGithub = () => {
  if (githubUrl) window.open(githubUrl)
}
</script>

<template>
  <header
    class="flex justify-between items-center px-3 shrink-0"
    :class="[ns.cls]"
  >
    <slot name="left"> </slot>
    <div class="flex text-xl items-center" :class="[ns.e('icon')]">
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
      <slot name="right-icon"></slot>
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
    align-items: center;
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
}

.dark {
  @include b('header') {
    --header-shadow: rgb(72, 72, 73);
    --icon-background-color: rgba(255, 255, 255, 0.12);
    --cc-divider-light: rgba(84, 84, 84, 0.48);
  }
}
</style>
