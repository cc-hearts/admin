<script setup lang="ts">
import Modal from '@/components/modal/modal.vue'
import { type ModalProps } from '@/components/modal/modal-helper'
import BaseIcon from '@/features/components/icon/baseIcon.vue'
defineProps({
  modalProps: {
    type: Object as PropType<ModalProps>,
    required: true,
  },
})

const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void
  (event: 'update:modal-value', iconName: string): void
}>()

const handleCancel = () => {
  emits('update:visible', false)
}

const tabsOption = [
  {
    title: '基础',
    key: 'base',
  },
  {
    title: '扩展',
    key: 'custom',
  },
]

const emitSelectIconName = (iconName: string) => {
  emits('update:modal-value', iconName)
  handleCancel()
}
</script>
<template>
  <Modal
    v-bind="modalProps"
    :visible="modalProps.visible"
    @update:visible="handleCancel"
    :footer="null"
  >
    <a-tabs tab-position="left">
      <a-tab-pane v-for="tab in tabsOption" :key="tab.key" :tab="tab.title">
        <template v-if="tab.key === 'base'">
          <div class="w-full relative h-400px p-b-2">
            <BaseIcon @update:modal-value="emitSelectIconName" />
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
  </Modal>
</template>
<style lang="scss"></style>
