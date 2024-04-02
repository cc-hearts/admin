<script setup lang="ts">
import { SettingOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive, toRef, watchEffect } from 'vue'
import { noop, type TableProps } from './helper'
import TableColumnAction from './components/table-columns-action.vue'
import { useColumnsSort } from './hooks/use-column-sort'
import { usePagination } from './hooks/use-pagination'
import { useRowSelection } from './hooks/use-row-selection'

defineOptions({ name: 'TablePro' })

const props = withDefaults(defineProps<Partial<TableProps>>(), {
  columns: () => [],
  bordered: false,
  total: 0,
  dataSource: () => [],
  loadData: noop,
  rowSelection: null,
  rowKey: 'key',
})

const tableProps = reactive({
  loading: false,
})

const loadData = () => {
  tableProps.loading = true
  Promise.resolve(
    props.loadData?.({
      current: pagination.current,
      pageSize: pagination.pageSize,
    }) || noop,
  ).finally(() => {
    tableProps.loading = false
  })
}

const { rowSelection, getSelectedLength, resetSelection } = useRowSelection()

const pagination = usePagination({ loadData })

onMounted(() => {
  loadData()
})

const handleRefresh = () => {
  loadData()
}

const { sortedColumnsProps, getSortedColumns } = useColumnsSort({
  rowKey: 'dataIndex',
  columns: toRef(props, 'columns'),
})

watchEffect(() => {
  sortedColumnsProps.onReset()
})

defineExpose({ reload: loadData })
</script>
<template>
  <div class="m-b-2 flex items-center">
    <div class="flex-1">
      <a-space>
        <slot name="action" />
      </a-space>
    </div>
    <a-space :size="16">
      <SyncOutlined class="cursor-pointer text-base" @click="handleRefresh" />
      <TableColumnAction v-bind="sortedColumnsProps">
        <SettingOutlined class="cursor-pointer text-base" />
      </TableColumnAction>
    </a-space>
  </div>
  <div class="m-y-4">
    <a-alert type="info" show-icon>
      <template #message>
        <span>已选择</span>
        <a-button size="small" type="text">{{ getSelectedLength }}</a-button>
        <a-button type="link" @click="resetSelection">清空</a-button>
      </template>
    </a-alert>
  </div>
  <a-table
    :loading="tableProps.loading"
    :columns="getSortedColumns"
    :pagination="pagination"
    :dataSource="dataSource"
    :bordered="bordered"
    :row-key="rowKey"
    :row-selection="rowSelection"
  >
    <template #bodyCell="records">
      <slot name="bodyCell" v-bind="records" />
    </template>
  </a-table>
</template>
