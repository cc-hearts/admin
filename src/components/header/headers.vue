<script setup lang="ts">
import { useNamespace } from "@/hooks";
import { GithubIcon } from "@/icons";
import { githubUrl } from "@/configs";
import ToggleDark from "@/components/switch/toggleDark.vue";
const ns = useNamespace("header");
const toGithub = () => {
  if (githubUrl) window.open(githubUrl);
};
</script>

<template>
  <header class="flex justify-between items-center px-3" :class="[ns.cls]">
    <slot name="left">
      <div></div>
    </slot>
    <div class="flex text-2xl items-center" :class="[ns.e('icon')]">
      <slot name="right-icon"></slot>
      <GithubIcon @click="toGithub" />
      <ToggleDark />
    </div>
  </header>
</template>

<style lang="scss">
@use "@/assets/scss/var/variable.scss" as *;
@use "@/assets/scss/common/mixins.scss" as *;

@include b("header") {
  --header-shadow: rgb(229, 230, 235);
  height: 60px;
  box-shadow: 0 1px 0 var(--header-shadow);

  &__icon {
    color: var(--color-text-2);

    & > div,
    & > button,
    & > svg {
      margin: 0 0.5rem;
    }

    svg {
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: var(--color-text-1);
      }
    }
  }
}

.dark {
  @include b("header") {
    --header-shadow: rgb(72, 72, 73);
  }
}
</style>
