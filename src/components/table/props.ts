import { buildProps } from '@/utils/props'
import { type TableColumnType } from 'ant-design-vue'
import { PropType } from 'vue'
export const TableProps = buildProps({
  columns: {
    type: Array as PropType<TableColumnType[]>,
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
  rowSelection: {
    type: Object,
    default: null,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
})
