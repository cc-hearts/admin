<template>
  <div>
    <Button type="primary" @click="addTableRow">新增</Button>
  </div>
  <Table v-bind="tableProps">
    <template #bodyCell="{ column }">
      <template
        v-if="['title', 'fieldName'].includes(String(column.dataIndex))"
      >
        <a-input />
      </template>
      <template v-else-if="['isExistForm'].includes(String(column.dataIndex))">
        <a-checkbox />
      </template>
      <template v-else-if="['formType'].includes(String(column.dataIndex))">
        <ASelect class="w-full" />
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import Button from '@/components/button/button.vue'
import { defineTableProps } from '@/components/table/define-table-props'

const tableProps = defineTableProps({
  columns: [
    { title: '标题', dataIndex: 'title' },
    { title: '字段名称', dataIndex: 'fieldName' },
    { title: '是否存在表单', dataIndex: 'isExistForm' },
    { title: '表单类型', dataIndex: 'formType' },
  ],
  dataSource: [] as unknown[],
})
const generatorNewDataSourceRow = () => {
  return tableProps.columns.reduce((acc, cur) => {
    Reflect.set(acc, cur.dataIndex, undefined)
    return cur
  }, {})
}
const addTableRow = () => {
  tableProps.dataSource = [
    ...tableProps.dataSource,
    generatorNewDataSourceRow(),
  ]
}
</script>
<style lang="scss"></style>
