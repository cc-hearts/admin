<script setup lang="ts">
import { noop } from '@cc-heart/utils'

const props = defineProps({
  title: String,
  visible: Boolean,
  okText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  onCancel: {
    type: Function as PropType<() => any>,
    default: noop,
  },
})
const handleOk = () => {
  emits('ok')
}
const emits = defineEmits(['update:visible', 'ok'])
const handleCancel = () => {
  emits('update:visible', false)
}
</script>
<template>
  <a-modal
    :open="props.visible"
    :title="props.title"
    :ok-text="props.okText"
    :cancel-text="props.cancelText"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot />
  </a-modal>
</template>
<style lang="scss"></style>
