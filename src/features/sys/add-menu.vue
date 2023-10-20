<script setup lang="ts">
import { ref } from 'vue'
import Form from '@/components/form/form.vue'
import Modal from '@/components/modal/modal.vue'
import { defineModal } from '@/components/modal/modal-helper'
import { Column } from '@/components/form/form'
import { menuType } from '@/configs/dict'
import addMenuApi from './apis'
const modalProps = defineModal({ title: '新增菜单' })
const formRef = ref()
const onOpen = () => {
  modalProps.visible = true
}
const formColumn: Column[] = [
  {
    type: 'input',
    name: 'name',
    label: '菜单名称',
  },
  {
    type: 'select',
    name: 'type',
    label: '菜单类型',
    extra: {
      options: menuType,
    },
  },
  {
    type: 'input',
    name: 'icon',
    label: '图标',
  },
  {
    type: 'input',
    name: 'path',
    label: '路由地址',
  },
  {
    type: 'input',
    name: 'components',
    label: '组件地址',
  },
  {
    type: 'input-number',
    name: 'sort',
    label: '排序',
  },
]

const handleOk = async () => {
  const val = formRef.value.getFieldsValue()
  const { data } = await addMenuApi.addMenu(val)
  console.log(data)
}
defineExpose({
  onOpen,
})
</script>
<template>
  <Modal
    v-bind="modalProps"
    v-model:visible="modalProps.visible"
    @ok="handleOk"
  >
    <Form ref="formRef" :columns="formColumn" />
  </Modal>
</template>
<style lang="scss"></style>
