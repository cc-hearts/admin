<script setup lang="ts">
import Table from '@/components/table/table.vue'
import AddModule from '@/features/components/button/AddModule.vue'
import BatchDelete from '@/features/components/button/BatchDelete.vue'
import AddMenu from '@/features/sys/add-menu.vue'
import addMenuApi from '@/features/sys/apis'
import { IPagination } from '@/types'
import { getApiType } from '@/types/helper'
import { TableColumnType } from 'ant-design-vue'
import { ref } from 'vue'

const addMenuRef = ref()
const tableRef = ref()

const tableProps = reactive({
  dataSource: [] as getApiType<(typeof addMenuApi)['list']>,
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

const handleOpenModal = () => {
  addMenuRef.value.onOpen()
}

const loadData = <T extends IPagination>(params: T) => {
  return addMenuApi.list(params).then((res) => {
    const { data } = res
    if (data) tableProps.dataSource = data
  })
}

const handleSuccessRefresh = () => {
  tableRef.value.reload()
}
</script>
<template>
  <a-card>
    <Table
      ref="tableRef"
      v-bind="tableProps"
      :row-selection="{}"
      :loadData="loadData"
    >
      <template #action>
        <AddModule @click="handleOpenModal" />
        <BatchDelete />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'path'">
          {{ record.path || '-' }}
        </template>
        <template v-if="column.dataIndex === 'components'">
          {{ record.components || '-' }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-button type="link">编辑</a-button>
        </template>
      </template>
    </Table>
  </a-card>
  <AddMenu ref="addMenuRef" @refresh="handleSuccessRefresh" />
</template>
<style lang="scss"></style>
