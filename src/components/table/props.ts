import { buildProps } from '@/utils/props'

export const TableProps = buildProps({
  columns: {
    type: Array,
    default: () => [],
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  loadData: {
    type: Function,
    default: () => ({}),
  },
})
