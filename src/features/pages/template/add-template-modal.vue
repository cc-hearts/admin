<script setup lang="ts">
import { defineFormSchemaProps } from '@/components/form-schema/utils/define-form-schema-props'
import { FormExpose } from '@/components/form-schema/helper'
import { FormSchema } from '@/components/form-schema/index'
import { defineModal } from '@/components/modal/modal-helper'
import Modal from '@/components/modal/modal.vue'
import { ref } from 'vue'

const emits = defineEmits<{
  (evt: 'submit', args: Record<string, unknown>): void
}>()

const modalProps = defineModal({ title: '新增菜单' })

const onOpen = () => {
  modalProps.visible = true
}

const formRef = ref<FormExpose>()
const formProps = defineFormSchemaProps({
  schema: [],
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
    <FormSchema ref="formRef" v-bind="formProps"> </FormSchema>
  </Modal>
</template>
