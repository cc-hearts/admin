<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/table/table.vue'
import AddModule from '@/features/components/button/AddModule.vue'
import BatchDelete from '@/features/components/button/BatchDelete.vue'
import AddMenu from '@/features/sys/add-menu.vue'
import addMenuApi from '@/features/sys/apis'
import { IPagination } from '@/types'
import { getApiType } from '@/types/helper'

const addMenuRef = ref()
const tableRef = ref()

const tableProps = reactive({
  dataSource: [] as getApiType<(typeof addMenuApi)['list']>,
  bordered: true,
  columns: markRaw([
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 100,
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
  ]),
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
  <Table ref="tableRef" v-bind="tableProps" :loadData="loadData">
    <template #action>
      <AddModule @click="handleOpenModal" />
      <BatchDelete />
    </template>
    <template #bodyCell="{ column }">
      <template v-if="column.dataIndex === 'action'">
        <a-button type="link">编辑</a-button>
      </template>
    </template>
  </Table>
  <AddMenu ref="addMenuRef" @refresh="handleSuccessRefresh" />
</template>
<style lang="scss"></style>