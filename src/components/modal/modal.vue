<script setup lang="ts">
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
