import { buildProps } from '@/utils/props'
import { PropType } from 'vue'

interface Options {
  label: string
  value: any
}
export interface Column {
  label: string
  type: string
  name: string
  width?: number
  fixed?: 'left' | 'right'
  slot?: { name: string; [props: string]: any }
  extra?: { [props: string]: any }
  options?: Options[]
}

export default buildProps({
  name: {
    type: String,
    default: 'basic',
  },
  labelCol: {
    type: Object,
    default: () => ({ span: 5 }),
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => [],
  },
  defaultValue: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
})
