import { buildProps } from '@/utils/props'

export const TableProps = buildProps({
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
})
