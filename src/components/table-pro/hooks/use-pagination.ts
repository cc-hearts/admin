import { reactive } from 'vue'
import type { Pagination, TableProps } from '../helper'
export function usePagination(
  options: Partial<
    Pagination & {
      loadData: TableProps['loadData']
    }
  > = {},
) {
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: (page: number, pageSize: number) => {
      pagination.current = page
      pagination.pageSize = pageSize
      if (options.loadData) {
        options.loadData({
          current: page,
          pageSize,
        })
      }
    },
    ...options,
  })
  return pagination
}
