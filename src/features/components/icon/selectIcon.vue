<script setup lang="ts" name="SelectIcon">
import { defineModal } from '@/components/modal/modal-helper'
import { SearchOutlined } from '@ant-design/icons-vue'
import SelectIconModal from './selectIconModal.vue'
const modalProps = defineModal({
  title: '图标选择',
})

const _modelValue = ref()

const props = defineProps({
  modalValue: {
    type: String,
    default: '',
  },
})

const showIcon = () => {
  modalProps.visible = true
}
const emits = defineEmits<{
  (event: 'update:modal-value', iconName: string): void
}>()

watchEffect(() => {
  _modelValue.value = props.modalValue
})

const emitSelectIconName = (iconName: string) => {
  emits('update:modal-value', iconName)
  _modelValue.value = iconName
}
</script>
<template>
  <a-input-group compact>
    <a-input
      :value="modalValue || _modelValue"
      style="width: calc(100% - 32px)"
    />
    <a-button @click="showIcon">
      <template #icon>
        <SearchOutlined />
      </template>
    </a-button>
  </a-input-group>
  <SelectIconModal
    :modalProps="modalProps"
    v-model:visible="modalProps.visible"
    @update:modal-value="emitSelectIconName"
  />
</template>
<style lang="scss"></style>
