<script setup lang="ts" name="ColumnsOperation">
import { noop } from '@cc-heart/utils'
import { TableColumnType } from 'ant-design-vue'
import { ComputedRef, PropType, Ref, computed, unref } from 'vue'
import draggable from 'vuedraggable'
import DragSort from './drag-sort-icon.vue'

type DataIndex = string | number

const props = defineProps({
  sortedColumns: {
    type: [Array, Object] as PropType<
      Array<TableColumnType> | Ref<Array<TableColumnType>>
    >,
    default: () => [],
  },
  columnsField: {
    type: Array as PropType<Array<DataIndex> | Ref<Array<DataIndex>>>,
    default: () => [],
  },
  rowKey: {
    type: String as PropType<ComputedRef<string> | string>,
    default: 'key',
  },
  onUpdateSortedColumns: {
    type: Function as PropType<(val: TableColumnType[]) => void>,
    default: noop,
  },
  onUpdateColumnsField: {
    type: Function as PropType<(val: (DataIndex | boolean)[]) => void>,
    default: noop,
  },
  onReset: {
    type: Function as PropType<() => void>,
    default: noop,
  },
})

let tempColumnSettings = [] as any[]
const handleChangeColumns = (val: any[]) => {
  tempColumnSettings = val
}

const emitChangeColumn = () => {
  props.onUpdateSortedColumns(tempColumnSettings)
  tempColumnSettings = []
}

const checkboxValue = computed(() => {
  return unref(props.columnsField)
})

const handleChangeCheckbox = (columnIds: Array<string | number | boolean>) => {
  props.onUpdateColumnsField(columnIds)
}
const isAllSelected = computed(() => {
  return unref(props.columnsField).length === unref(props.sortedColumns).length
})

const toggleShowColumns = () => {
  if (isAllSelected.value) {
    props.onUpdateColumnsField([])
  } else {
    props.onUpdateColumnsField(
      unref(props.sortedColumns).map(
        (item: TableColumnType) =>
          Reflect.get(item, unref(props.rowKey) as string)!,
      ),
    )
  }
}
const handleReset = () => {
  props.onReset()
}
</script>
<template>
  <a-popover trigger="click" placement="bottomRight">
    <slot />
    <template #content>
      <div>
        <a-checkbox :checked="isAllSelected" @update:checked="toggleShowColumns"
          >列展示</a-checkbox
        >
        <a-button type="link" @click="handleReset"> 重置 </a-button>
      </div>
      <a-divider class="m-y-2" />

      <a-checkbox-group
        :value="checkboxValue"
        @update:value="handleChangeCheckbox"
      >
        <draggable
          :model-value="unref(sortedColumns)"
          @update:model-value="handleChangeColumns"
          @end="emitChangeColumn"
          group="description"
          animation="300"
          class="flex flex-col"
          handle=".drag-handle"
          item-key="dataIndex"
        >
          <template #item="{ element }">
            <div class="flex items-center">
              <div class="drag-handle m-r-1">
                <DragSort />
              </div>
              <a-checkbox
                :key="element.dataIndex"
                :value="element.dataIndex"
                :label="element.title"
              >
                {{ element.title }}
              </a-checkbox>
            </div>
          </template>
        </draggable>
      </a-checkbox-group>
    </template>
  </a-popover>
</template>
<style lang="scss">
.drag-handle {
  .action-more {
    display: inline-block;
    width: 1em;
  }
}
</style>
