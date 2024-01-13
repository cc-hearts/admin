<script setup lang="ts">
import { FormColumn, FormExpose } from '@/components/form/form'
import Form from '@/components/form/form.vue'
import { defineModal } from '@/components/modal/modal-helper'
import Modal from '@/components/modal/modal.vue'
import { menuType } from '@/configs/dict'
import SelectIcon from '@/features/components/icon/selectIcon.vue'
import {
  ModalFormExpose,
  useModalFormExpose,
} from '@/features/hooks/useModalFormExpose'
import { errorMsg } from '@/utils/message'
import type { fn } from '@cc-heart/utils/helper'
import { RadioChangeEvent } from 'ant-design-vue'
import { ref } from 'vue'
import addMenuApi, { IAddMenu, getMenuTree } from './apis'

const props = defineProps({
  status: {
    type: String,
    default: 'add',
    valid: (val: string) => ['add', 'edit'].includes(val),
  },
  id: {
    type: Number as PropType<number | null>,
    default: null,
  },
})

const modalProps = defineModal({ title: '新增菜单' })
const formRef = ref<FormExpose>()
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
      menuOptions.value.unshift({
        label: '根目录',
        value: 0,
      })
    }
  })
}
const defaultValue = {
  type: '0',
  pid: 0,
  sort: 1,
}

function changeFormColumns(value: string) {
  const menuNameIndex = formColumn.findIndex((item) => item.name === 'name')
  formColumn[menuNameIndex].label = value === '0' ? '目录名称' : '菜单名称'
  switch (value) {
    case '0': {
      const pathIndex = formColumn.findIndex((item) => item.name === 'path')
      if (pathIndex !== -1) formColumn.splice(pathIndex, 1)
      const componentsIndex = formColumn.findIndex(
        (item) => item.name === 'components',
      )
      if (componentsIndex !== -1) formColumn.splice(componentsIndex, 1)
      break
    }
    case '1': {
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
    default: {
      break
    }
  }
}

function handleChangeFormColumns(e: RadioChangeEvent) {
  const { value } = e.target
  changeFormColumns(value)
}

const formColumn: FormColumn[] = shallowReactive([
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
    slot: { name: 'icon' },
  },
  {
    type: 'input-number',
    name: 'sort',
    label: '排序',
  },
])

const emits = defineEmits<{ (event: 'refresh'): void }>()

const handleOk = async () => {
  const bool = await formRef.value!.validate()
  if (!bool) {
    return
  }
  const val = formRef.value!.getFieldsValue<IAddMenu>()
  if (props.status === 'add') {
    await addMenuApi.addMenu(val)
  } else {
    if (!props.id) {
      errorMsg('[add menu]:id 参数错误')
      return
    }
    await addMenuApi.editMenu(props.id, { ...val, children: undefined })
  }
  modalProps.visible = false
  emits('refresh')
}

const exposePipe = (name: keyof ModalFormExpose, fn: fn) => {
  if (name === 'setFieldsValue') {
    return function (target: Record<PropertyKey, any>) {
      const spliceTarget = { ...target }
      if (spliceTarget.pid) {
        spliceTarget.pid = Number(spliceTarget.pid)
      }
      fn(spliceTarget)
      changeFormColumns(spliceTarget.type || defaultValue.type)
    }
  } else if (name === 'resetFields') {
    return function () {
      fn()
      formRef.value!.setFieldsValue({ ...defaultValue })
    }
  }
}
const modalFormExposeResult = useModalFormExpose(formRef, exposePipe)

defineExpose({ onOpen, ...modalFormExposeResult })

watchEffect(() => {
  if (!modalProps.visible && formRef.value) {
    formRef.value.resetFields()
  }
})
</script>
<template>
  <Modal
    v-bind="modalProps"
    v-model:visible="modalProps.visible"
    @ok="handleOk"
  >
    <Form ref="formRef" :columns="formColumn" :default-value="defaultValue">
      <template #icon="{ formState }">
        <SelectIcon v-model:modal-value="formState.icon" />
      </template>
    </Form>
  </Modal>
</template>
<style lang="scss"></style>
