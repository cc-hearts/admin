<script setup lang="ts">
import { noop } from '@cc-heart/utils'
import { TableProps } from './props'
import { RedoOutlined, SettingOutlined } from '@ant-design/icons-vue'
const props = defineProps(TableProps)

const state = reactive({
  loading: false,
})
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
</script>
<template>
  <div class="m-b-2 flex items-center">
    <div class="flex-1">
      <a-space>
        <slot name="action" />
      </a-space>
    </div>
    <a-space>
      <RedoOutlined class="cursor-pointer" @click="handleRefresh" />
      <SettingOutlined class="cursor-pointer" />
    </a-space>
  </div>
  <a-table
    :loading="state.loading"
    :columns="props.columns"
    :pagination="pagination"
    :dataSource="props.dataSource"
    :bordered="props.bordered"
  >
    <template #bodyCell="records">
      <slot name="bodyCell" v-bind="records" />
    </template>
  </a-table>
</template>
<style lang="scss"></style>
