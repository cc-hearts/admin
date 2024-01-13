<script setup lang="ts" name="ColumnsOperation">
import DragSort from '@/icons/dragSort.vue'
import { TableColumnType } from 'ant-design-vue'
import { PropType } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumnType[]>,
    default: () => [],
  },
  columnIds: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits<{
  (event: 'update:columns', args: any[]): void
  (event: 'update:columnIds', args: any[]): void
  (event: 'reset'): void
}>()

let tempColumnSettings = [] as any[]
const handleChangeColumns = (val: any[]) => {
  tempColumnSettings = val
}

const emitChangeColumn = () => {
  emits('update:columns', tempColumnSettings)
  tempColumnSettings = []
}

const handleChangeCheckbox = (columnIds: Array<string | number>) => {
  emits('update:columnIds', columnIds)
}
const isAllSelected = computed(() => {
  return props.columnIds.length === props.columns.length
})

const toggleShowColumns = () => {
  if (isAllSelected.value) {
    emits('update:columnIds', [])
  } else {
    emits(
      'update:columnIds',
      props.columns.map((item) => Reflect.get(item, 'dataIndex')!),
    )
  }
}
const handleReset = () => {
  emits('reset')
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

      <a-checkbox-group :value="columnIds" @update:value="handleChangeCheckbox">
        <draggable
          :model-value="columns"
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
  .anticon-more {
    display: inline-block;
    width: 1em;
  }
}
</style>
