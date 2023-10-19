<script setup lang="ts">
import { onMounted, shallowReactive } from 'vue'
import { definePagination } from '@/utils/pagination'
import { getDeployList, requestDeploy } from '@/features/deploy/apis'
import { getApiType } from '@/types/helper'

const tableProps = shallowReactive({
  dataSource: [] as getApiType<typeof getDeployList>['dataSource'],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      name: 'Action',
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ],
  total: 0,
})

const paginationProps = definePagination()

const handleDeploy = (id: number) => {
  const data = requestDeploy(id)
  console.log(data)
}

onMounted(async () => {
  const { data } = await getDeployList(paginationProps)
  if (data) {
    tableProps.dataSource = data.dataSource
    tableProps.total = data.total
  }
})
</script>
<template>
  <div>
    <a-table :dataSource="tableProps.dataSource" :columns="tableProps.columns">
      <template #bodyCell="{ column, record }">
        <span v-if="column.key === 'action'">
          <a-button type="link">Edit</a-button>
          <a-button type="link">Delete</a-button>
          <a-button type="link" @click="() => handleDeploy(record.id)"
            >Deploy</a-button
          >
        </span>
      </template>
    </a-table>
  </div>
</template>
<style lang="scss"></style>
