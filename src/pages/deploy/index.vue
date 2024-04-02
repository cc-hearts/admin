<script setup lang="ts">
import { defineTableProps } from '@/components/table-pro/define-table-props'
import { getDeployList, requestDeploy } from '@/features/deploy/apis'
import { getApiType } from '@/types/helper'
import { definePagination } from '@/utils/pagination'
import type { TableColumnType } from 'ant-design-vue'
import { CcTag } from '@/components/index'
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
  rowKey: 'id',
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
    <TablePro ref="tableRef" v-bind="tableProps" :load-data="loadData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'rootPath'">
          <CcTag color="green">{{ record.rootPath }}</CcTag>
        </template>
        <span v-if="column.key === 'action'">
          <LinkButton>Edit</LinkButton>
          <LinkButton>Delete</LinkButton>
          <LinkButton @click="() => handleDeploy(record.id)">Deploy</LinkButton>
        </span>
      </template>
    </TablePro>
  </div>
</template>
