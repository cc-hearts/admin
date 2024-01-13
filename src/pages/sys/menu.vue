<script setup lang="ts">
import { defineTableProps } from '@/components/table/define-table-props'
import Table from '@/components/table/table.vue'
import AddModule from '@/features/components/button/AddModule.vue'
import BatchDelete from '@/features/components/button/BatchDelete.vue'
import AddMenu from '@/features/sys/add-menu.vue'
import menuApi, { IAddMenu } from '@/features/sys/apis'
import MenuType from '@/features/sys/menu-type.vue'

import { IPagination } from '@/types'
import { getApiType } from '@/types/helper'
import { Modal, TableColumnType } from 'ant-design-vue'
import { ref } from 'vue'

const addMenuRef = ref()
const tableRef = ref()
type menuStatus = 'add' | 'edit'
const addMenuStatus = reactive({
  status: 'add' as menuStatus,
  id: null as number | null,
})

const tableProps = defineTableProps({
  dataSource: [] as getApiType<(typeof menuApi)['list']>,
  bordered: true,
  columns: markRaw([
    {
      title: '菜单名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      align: 'center',
    },
    {
      title: '组件路径',
      dataIndex: 'components',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
    },
  ] as TableColumnType[]),
})

const handleOpenModal = (status: menuStatus = 'add') => {
  addMenuStatus.status = status
  addMenuRef.value.onOpen()
}

const handleOpenEditModal = (record: IAddMenu & { id: number }) => {
  addMenuStatus.id = record.id
  addMenuRef.value.setFieldsValue({ ...record })
  handleOpenModal('edit')
}

const loadData = <T extends IPagination>(params: T) => {
  return menuApi.list(params).then((res) => {
    const { data } = res
    if (data) tableProps.dataSource = data
  })
}

const handleSuccessRefresh = () => {
  tableRef.value.reload()
}

const handleDeleteMenus = async (ids: (string | number)[]) => {
  const params = {
    id: ids.map((target) => String(target)),
  }

  Modal.confirm({
    title: '提示',
    content: '确认删除吗？',
    onOk: async () => {
      await menuApi.deleteMenus(params)
      handleSuccessRefresh()
    },
  })
}
</script>
<template>
  <a-card>
    <Table ref="tableRef" v-bind="tableProps" :loadData="loadData">
      <template #action>
        <AddModule @click="handleOpenModal('add')" />
        <BatchDelete />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'path'">
          {{ record.path || '-' }}
        </template>
        <template v-if="column.dataIndex === 'components'">
          {{ record.components || '-' }}
        </template>
        <template v-if="column.dataIndex === 'type'">
          <MenuType :type="record.type" />
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-button type="link" @click="handleOpenEditModal(record)"
            >编辑</a-button
          >
          <a-divider type="vertical" />
          <a-button type="link" danger @click="handleDeleteMenus([record.id])"
            >删除</a-button
          >
        </template>
      </template>
    </Table>
  </a-card>
  <AddMenu
    ref="addMenuRef"
    @refresh="handleSuccessRefresh"
    v-bind="addMenuStatus"
  />
</template>
<style lang="scss"></style>
