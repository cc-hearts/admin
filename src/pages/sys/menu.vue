<script setup lang="ts">
import Table from '@/components/table/table.vue'
import AddModule from '@/features/components/button/AddModule.vue'
import BatchDelete from '@/features/components/button/BatchDelete.vue'
const tableProps = {
  dataSource: [],
  columns: [
    {
      title: '显示名称',
      dataIndex: 'name',
      width: 100,
      fixed: 'left',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '路由地址',
      dataIndex: 'routerPath',
    },
    {
      title: '组件路径',
      dataIndex: 'componentPath',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
    },
  ],
}
</script>
<template>
  <Table v-bind="tableProps">
    <template #action>
      <AddModule />
      <BatchDelete />
    </template>
  </Table>
</template>
<style lang="scss"></style>
