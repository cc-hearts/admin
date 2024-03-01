<template>
  <div>
    <Button type="primary" @click="addTableRow">新增</Button>
    <Button type="dashed" @click="generateOnlineCode">生成在线代码</Button>
  </div>
  <Table v-bind="tableProps">
    <template #bodyCell="{ column, index }">
      <template
        v-if="['title', 'fieldName'].includes(String(column.dataIndex))"
      >
        <AInput
          v-model="tableProps.dataSource[index][String(column.dataIndex)]"
        />
      </template>
      <template v-else-if="['isExistForm'].includes(String(column.dataIndex))">
        <ACheckbox
          v-model="tableProps.dataSource[index][String(column.dataIndex)]"
        />
      </template>
      <template v-else-if="['formType'].includes(String(column.dataIndex))">
        <ASelect
          class="w-full"
          :options="formTypes"
          v-model="tableProps.dataSource[index][String(column.dataIndex)]"
        />
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
  dataSource: [] as Record<string, any>[],
})

// TODO: use dict
const formTypes = [
  { value: 'input', label: '输入框' },
  { value: 'select', label: '下拉框' },
  { value: 'checkbox', label: '复选框' },
]

const generatorNewDataSourceRow = () => {
  return tableProps.columns.reduce((acc, cur) => {
    Reflect.set(acc, cur.dataIndex, undefined)
    return cur
  }, {})
}

const generateOnlineCode = () => {
  /** TODO */
}
const addTableRow = () => {
  tableProps.dataSource = [
    ...tableProps.dataSource,
    generatorNewDataSourceRow(),
  ]
}
</script>
