<script setup lang="ts">
import { FormExpose } from '@/components/form/form'
import Form from '@/components/form/form.vue'
import Modal from '@/components/modal/modal.vue'
import { defineModal } from '@/components/modal/modal-helper'
import { ref } from 'vue'
import { defineFormProps } from '@/components/form/define-form-props'
const emits = defineEmits<{
  (evt: 'submit', args: Record<string, unknown>): void
}>()

const modalProps = defineModal({ title: '新增菜单' })

const onOpen = () => {
  modalProps.visible = true
}

const formRef = ref<FormExpose>()
const formProps = defineFormProps({
  columns: [],
})

watch(
  () => modalProps.visible,
  (val) => {
    if (!val) {
      formRef.value?.resetFields()
    }
  },
)

const handleOk = () => {
  formRef.value?.validate().then(([bool, formFieldValue]) => {
    if (!bool) return

    emits('submit', formFieldValue)
    modalProps.visible = false
  })
}

defineExpose({ onOpen })
</script>
<template>
  <Modal
    v-bind="modalProps"
    v-model:visible="modalProps.visible"
    @ok="handleOk"
  >
    <Form ref="formRef" v-bind="formProps"> </Form>
  </Modal>
</template>
