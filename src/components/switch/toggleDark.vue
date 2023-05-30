<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useIsDark, useToggleDark, useNamespace } from "@/hooks";
import { SunIcon, MoonIcon } from "@/icons";
const checked = ref(false);
function handleToggleTheme() {
  useToggleDark();
  toggleChecked();
}

const ns = useNamespace("appearance");

function toggleChecked() {
  checked.value = useIsDark();
}

onMounted(() => {
  toggleChecked();
});
</script>

<template>
  <div class="flex" :class="[ns.cls]">
    <button
      role="switch"
      class="relative block shrink-0 outline-0"
      :aria-checked="checked"
      @click="handleToggleTheme"
    >
      <span :class="[ns.e('check')]">
        <span
          class="relative block overflow-hidden rounded-full"
          :class="[ns.e('icon')]"
        >
          <SunIcon />
          <MoonIcon />
        </span>
      </span>
    </button>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/var/variable.scss" as *;
@use "@/assets/scss/common/mixins.scss" as *;

.dark {
  @include b("appearance") {
    --switch-border-divider: #545454a6;
    --switch-bg-color: #3a3a3a;
    --switch-checked-color: #1a1a1a;
    --switch-box-shadow-1: --switch-bg-color;
    --switch-fill-svg: rgba(255, 255, 255, 0.87);
  }
}

@include b("appearance") {
  --switch-border-divider: #3c3c3c4a;
  --switch-bg-color: #f1f1f1;
  --switch-checked-color: #fff;
  --switch-box-shadow-1: --switch-bg-color;
  --switch-fill-svg: rgba(60, 60, 60, 0.7);
  --switch-translate-x: 18px;

  button {
    border-radius: 11px;
    width: 40px;
    height: 22px;
    cursor: pointer;
    border: 1px solid var(--switch-border-divider);
    background-color: var(--switch-bg-color);
    transition: border-color 0.25s;

    &[aria-checked="true"] {
      $is-at-root: false !global;
      @include e("check") {
        transform: translate(var(--switch-translate-x));
      }

      $is-at-root: true !global;

      .sun {
        opacity: 0;
      }

      .moon {
        opacity: 1;
      }
    }
  }

  @include e("icon") {
    width: 18px;
    height: 18px;

    svg {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      fill: var(--switch-fill-svg);
    }
  }

  @include e("check") {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--switch-checked-color);
    transition: transform 0.25s;
  }
}

.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}
</style>
