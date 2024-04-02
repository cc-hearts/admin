import type { TableProps } from './helper'

export function defineTableProps<T extends Partial<TableProps>>(data: T) {
  return shallowReactive({ ...data })
}
