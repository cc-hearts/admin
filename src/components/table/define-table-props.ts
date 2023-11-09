import { fn } from '@cc-heart/utils/helper'
import { TableColumnType } from 'ant-design-vue'

interface TableProps {
  columns: TableColumnType[]
  bordered: boolean
  total: number
  dataSource: any[]
  loadData: fn
  rowSelection: Record<PropertyKey, any>
  rowKey: string
}
export function defineTableProps<T extends Partial<TableProps>>(data: T) {
  return shallowReactive({ ...data })
}
