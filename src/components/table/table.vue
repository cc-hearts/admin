<script setup lang="ts">
import { TableProps } from './props'
import { RedoOutlined, SettingOutlined } from '@ant-design/icons-vue'
const props = defineProps(TableProps)

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
})
</script>
<template>
  <div class="m-b-2 flex items-center">
    <div class="flex-1">
      <a-space>
        <slot name="action" />
      </a-space>
    </div>
    <a-space>
      <RedoOutlined class="cursor-pointer" />
      <SettingOutlined class="cursor-pointer" />
    </a-space>
  </div>
  <a-table
    :columns="props.columns"
    :pagination="pagination"
    :dataSource="props.dataSource"
  />
</template>
<style lang="scss"></style>
