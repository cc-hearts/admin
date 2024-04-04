import { computed, shallowReactive } from 'vue'
import { useRowSelectionParams } from '../helper'
export function useRowSelection<K = string | number, T = unknown>(
  options: useRowSelectionParams = {},
) {
  const rowSelection = shallowReactive({
    selectedRowKeys: [] as K[],
    selectedRows: [] as T[],
    onChange: (selectedRowKeys: Array<K>, selectedRows: Array<T>) => {
      if (options.onChange) {
        options.onChange(selectedRowKeys, selectedRows)
      } else {
        rowSelection.selectedRowKeys = selectedRowKeys
        rowSelection.selectedRows = selectedRows
      }
    },
  })
  const getSelectedLength = computed(() => rowSelection.selectedRowKeys.length)
  const resetSelection = () => {
    rowSelection.onChange([], [])
  }
  return {
    rowSelection,
    getSelectedLength,
    resetSelection,
  }
}
