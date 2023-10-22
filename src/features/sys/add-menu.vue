<script setup lang="ts">
import { Column } from '@/components/form/form'
import Form from '@/components/form/form.vue'
import { defineModal } from '@/components/modal/modal-helper'
import Modal from '@/components/modal/modal.vue'
import { menuType } from '@/configs/dict'
import { RadioChangeEvent } from 'ant-design-vue'
import { ref } from 'vue'
import addMenuApi, { getMenuTree } from './apis'
const modalProps = defineModal({ title: '新增菜单' })
const formRef = ref()
const menuOptions = ref<{ label: string; value: string | number }[]>([])
const onOpen = () => {
  modalProps.visible = true
  getMenuTree().then((res) => {
    const { data } = res
    if (data) {
      menuOptions.value = data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    }
  })
}
const defaultValue = {
  type: '0',
}

function handleChangeFormColumns(e: RadioChangeEvent) {
  const { value } = e.target
  const menuNameIndex = formColumn.findIndex((item) => item.name === 'name')
  formColumn[menuNameIndex].label = value === '0' ? '目录名称' : '菜单名称'
  switch (value) {
    case '0':
      const pathIndex = formColumn.findIndex((item) => item.name === 'path')
      formColumn.splice(pathIndex, 1)
      const componentsIndex = formColumn.findIndex(
        (item) => item.name === 'components',
      )
      formColumn.splice(componentsIndex, 1)
      break
    case '1':
      const pidIndex = formColumn.findIndex((item) => item.name === 'pid')
      formColumn.splice(
        pidIndex + 1,
        0,
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
      )
      break
  }
}
const formColumn: Column[] = shallowReactive([
  {
    type: 'radio',
    name: 'type',
    label: '菜单类型',
    extra: {
      options: menuType,
      onChange: handleChangeFormColumns,
    },
  },
  {
    type: 'input',
    name: 'name',
    label: '菜单名称',
  },

  {
    type: 'select',
    name: 'pid',
    label: '父级菜单',
    extra: {
      options: menuOptions,
    },
  },
  {
    type: 'input',
    name: 'icon',
    label: '图标',
  },
  {
    type: 'input-number',
    name: 'sort',
    label: '排序',
  },
])

const emits = defineEmits<{ (event: 'refresh'): void }>()

const handleOk = async () => {
  const val = formRef.value.getFieldsValue()
  await addMenuApi.addMenu(val)
  modalProps.visible = false
  emits('refresh')
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
    <Form ref="formRef" :columns="formColumn" :default-value="defaultValue" />
  </Modal>
</template>
<style lang="scss"></style>
