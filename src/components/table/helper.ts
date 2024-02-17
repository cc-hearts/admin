import { type IPagination } from '@/types'
import { type TableColumnType } from 'ant-design-vue'

export interface RowSelection<T, K> {
  type?: 'checkbox' | 'radio'
  selectedRowKeys: K[]
  selectedRows: T[]
  onChange: (selectedRowKeys: K[], selectedRows: T[]) => void
}

export interface TableProps<T = unknown> {
  columns: TableColumnType[]
  bordered: boolean
  total: number
  dataSource: Array<T>
  loadData: <T extends IPagination>(args: T) => any
  rowSelection: RowSelection<any, any> | null
  rowKey: string
}
