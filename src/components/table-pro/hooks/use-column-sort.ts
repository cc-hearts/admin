import { TableColumnType } from 'ant-design-vue'
import { DataIndex } from 'ant-design-vue/es/vc-table/interface'
import { computed, ref } from 'vue'
import { UseColumnSortParams } from '../helper'
export function useColumnsSort(
  props: UseColumnSortParams = {
    rowKey: 'key',
    columns: ref([]),
  },
): any {
  const sortedColumns = ref<TableColumnType[]>([])
  const columnsField = ref<DataIndex[]>([])
  const rowKey = computed(() => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey()
    }
    return props.rowKey
  })
  const onUpdateSortedColumns = (columns: TableColumnType[]) => {
    sortedColumns.value = columns
  }
  const onUpdateColumnsField = (newColumnsField: DataIndex[]) => {
    columnsField.value = newColumnsField
  }
  const onReset = () => {
    columnsField.value = props.columns.value.map(
      (item) => Reflect.get(item, rowKey.value)!,
    )
    sortedColumns.value = [...props.columns.value]
  }
  const getSortedColumns = computed(() => {
    // @ts-ignore
    return sortedColumns.value.filter((item) =>
      columnsField.value.includes(Reflect.get(item, rowKey.value)!),
    )
  })
  return {
    sortedColumnsProps: {
      sortedColumns,
      columnsField,
      rowKey,
      onUpdateSortedColumns,
      onUpdateColumnsField,
      onReset,
    },
    getSortedColumns,
  }
}
