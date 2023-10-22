<script setup lang="ts">
import { isDark } from '@/configs'
import { useNamespace } from '@/hooks'
import { buttonProps } from './button'

const props = defineProps(buttonProps)
const state = reactive({
  x: '0px',
  y: '0px',
})
const ns = useNamespace('button')
const styles = computed(() => {
  // TODO: size
  const styles = {
    primary: '#65b787',
    'danger-color': '#fff',
    'active-danger-color': '#fff',
    'active-primary-color': '#fff',
    'flat-color': '#3ecd79a8',
    'primary-color': '#fff',
    'default-bgc': 'transparent',
    'primary-bgc': '#65b787',
    'danger-bgc': '#ee8079',
    'default-border-color': '#ccc',
    ...unref(state),
  }
  if (isDark.value) {
    return ns.genCssVar({
      color: '#fff',
      ...styles,
    })
  }
  return ns.genCssVar({
    color: '#333',
    ...styles,
  })
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return
  state['x'] = e.offsetX + 'px'
  state['y'] = e.offsetY + 'px'
}
</script>
<template>
  <button
    ref="btn"
    :class="[ns.cls, ns.e(props.type)]"
    :style="styles"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<style lang="scss">
@use '@/assets/scss/var/variable.scss' as *;
@use '@/assets/scss/common/mixins.scss' as *;
@use '@/assets/scss/common/function.scss' as *;

@mixin changeColor($color: getCssVarName('button', 'color')) {
  color: var($color);
  border-color: currentColor;
}

@mixin disabled() {
  opacity: 0.5;
  cursor: not-allowed;
}

@mixin default() {
  border: 1px solid var(getCssVarName('button', 'default', 'border', 'color'));
  color: var(getCssVarName('button', 'color'));
  // focus-within属性 后代元素获取到了焦点 则会变成默认主题色
  &:not([disabled]):hover,
  &:not([disabled]):focus-within {
    @include changeColor(getCssVarName('button', 'primary', 'bgc'));
  }
}

@mixin colorAndBgcMixins($color, $bgColor) {
  color: var(#{$color});
  background-color: var(#{$bgColor});
}

@mixin primaryMixins(
  $bgColor: getCssVarName('button', 'primary', 'bgc'),
  $color: getCssVarName('button', 'color')
) {
  @include colorAndBgcMixins($color, $bgColor);
}

@mixin flatMixins(
  $bgColor: getCssVarName('button', 'default', 'bgc'),
  $color: getCssVarName('button', 'color')
) {
  @include colorAndBgcMixins($color, $bgColor);
}

@mixin gradientMixins($color: getCssVarName('button', 'primary', 'bgc')) {
  background-image: radial-gradient(
    circle,
    var($color) 10%,
    transparent 10.01%
  );
}

@include b('button') {
  display: inline-block;
  position: relative;
  padding: 0.3em 0.75em;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: getCssVarWithDefault('button-default-bgc', transparent);
  transition: all 0.3s;
  overflow: hidden;
  @include changeColor();

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: var(getCssVarName('button', 'default', 'bgc'));
    transition: opacity 0.3s;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: var(getCssVarName('button', 'x'), 0);
    top: var(getCssVarName('button', 'y'), 0);
    pointer-events: none;
    background-repeat: no-repeat;
    background-position: 50%;
    // scale关键
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
    transition:
      transform 0.3s,
      opacity 0.8s;
    @include gradientMixins;
  }

  &:not([disabled]):active::after {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.3;
    transition: 0s;
  }

  &:not([disabled]):active::before {
    opacity: 0.2;
  }

  @include e('default') {
    @include default();

    @include m('disabled') {
      @include disabled();
    }
  }

  @include e('primary') {
    @include primaryMixins(
      getCssVarName('button', 'primary', 'bgc'),
      getCssVarName('button', 'primary', 'color')
    );
    &::after {
      @include gradientMixins(
        getCssVarName('button', 'active', 'primary', 'color')
      );
    }

    @include m('disabled') {
      @include disabled();
    }
  }

  @include e('dashed') {
    @include default();
    border: 1px dashed
      var(getCssVarName('button', 'default', 'border', 'color'));
    @include m('disabled') {
      @include disabled();
    }
  }

  @include e('danger') {
    @include primaryMixins(
      getCssVarName('button', 'danger', 'bgc'),
      getCssVarName('button', 'danger', 'color')
    );

    &::after {
      @include gradientMixins(
        getCssVarName('button', 'active', 'danger', 'color')
      );
    }
    @include m('disabled') {
      @include disabled();
    }
  }

  @include e('flat') {
    transition:
      color 0.3s,
      background-color 0.5s;
    &:not([disabled]):hover {
      @include flatMixins(
        getCssVarName('button', 'bgc'),
        getCssVarName('button', 'flat', 'color')
      );
    }
    @include m('disabled') {
      @include disabled();
    }
  }
}
</style>
