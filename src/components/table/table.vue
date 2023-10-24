<script setup lang="ts">
import { SettingOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { noop } from '@cc-heart/utils'
import { TableColumnType } from 'ant-design-vue'
import { DataIndex } from 'ant-design-vue/es/vc-table/interface'
import ColumnsOperation from './columns-operation.vue'
import { TableProps } from './props'

const props = defineProps(TableProps)
const state = reactive({
  loading: false,
  columnSetting: [] as any[],
  showColumnIds: [] as DataIndex[],
})

const selections = reactive({
  selectedRowKeys: [] as string[],
  selectedRows: [] as any[],
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    selections.selectedRowKeys = selectedRowKeys
    selections.selectedRows = selectedRows
  },
})

function getSelectedLength() {
  return (
    props.rowSelection?.selectedRowKeys?.length ||
    selections.selectedRowKeys.length
  )
}
const pagination = reactive({
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
})
const loadData = () => {
  state.loading = true
  Promise.resolve(
    props.loadData?.({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    }) || noop,
  ).finally(() => {
    state.loading = false
  })
}
onMounted(() => {
  loadData()
})

const handleRefresh = () => {
  loadData()
}

const handleResetColumns = () => {
  state.showColumnIds = props.columns.map(
    (item) => Reflect.get(item, 'dataIndex')!,
  )
  state.columnSetting = [...props.columns]
}

const handleChangeColumns = (columns: TableColumnType[]) => {
  state.columnSetting = columns
}

const tableColumns = computed(() => {
  return state.columnSetting.filter((item) =>
    state.showColumnIds.includes(Reflect.get(item, 'dataIndex')!),
  )
})

const resetSelection = () => {
  selections.onChange([], [])
  if (props.rowSelection?.onChange) {
    props.rowSelection.onChange([], [])
  }
}

watchEffect(() => {
  handleResetColumns()
})

defineExpose({
  reload: loadData,
})
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
      <ColumnsOperation
        :columns="state.columnSetting"
        @update:columns="handleChangeColumns"
        v-model:columnIds="state.showColumnIds"
        @reset="handleResetColumns"
      >
        <SettingOutlined class="cursor-pointer text-base" />
      </ColumnsOperation>
    </a-space>
  </div>
  <div class="m-y-4">
    <a-alert type="info" show-icon>
      <template #message>
        <span>已选择</span>
        <a-button size="small" type="text">{{ getSelectedLength() }}</a-button>
        <a-button type="link" @click="resetSelection">清空</a-button>
      </template>
    </a-alert>
  </div>
  <a-table
    :loading="state.loading"
    :columns="tableColumns"
    :pagination="pagination"
    :dataSource="props.dataSource"
    :bordered="props.bordered"
    :row-key="props.rowKey"
    :row-selection="props.rowSelection || selections"
  >
    <template #bodyCell="records">
      <slot name="bodyCell" v-bind="records" />
    </template>
  </a-table>
</template>
<style lang="scss"></style>
