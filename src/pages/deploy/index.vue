<script setup lang="ts">
import { defineTableProps } from '@/components/table/define-table-props'
import Table from '@/components/table/table.vue'
import { getDeployList, requestDeploy } from '@/features/deploy/apis'
import { getApiType } from '@/types/helper'
import { definePagination } from '@/utils/pagination'
import type { TableColumnType } from 'ant-design-vue'

const tableProps = defineTableProps({
  dataSource: [] as getApiType<typeof getDeployList>['dataSource'],
  bordered: true,
  columns: [
    {
      title: '部署名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '部署根路径',
      dataIndex: 'rootPath',
      key: 'rootPath',
      slot: { name: 'rootPath' },
      align: 'center',
    },
    {
      name: 'Action',
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
    },
  ] as TableColumnType[],
  total: 0,
})

const paginationProps = definePagination()

const handleDeploy = (id: number) => {
  const data = requestDeploy(id)
  console.log(data)
}

const loadData = async () => {
  const { data } = await getDeployList(paginationProps)
  if (data) {
    tableProps.dataSource = data.dataSource
    tableProps.total = data.total
  }
}
</script>
<template>
  <div>
    <Table ref="tableRef" v-bind="tableProps" :load-data="loadData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'rootPath'">
          <a-tag color="green">{{ record.rootPath }}</a-tag>
        </template>
        <span v-if="column.key === 'action'">
          <a-button type="link">Edit</a-button>
          <a-button type="link">Delete</a-button>
          <a-button type="link" @click="() => handleDeploy(record.id)"
            >Deploy</a-button
          >
        </span>
      </template>
    </Table>
  </div>
</template>
<style lang="scss"></style>
