import { buildProps } from '@/utils/props'
import { PropType } from 'vue'

export interface Column {
  label: string
  type: string
  name: string
  width?: number
  fixed?: 'left' | 'right'
  slot?: { name: string; [props: string]: any }
  extra?: { [props: string]: any }
}

export default buildProps({
  name: {
    type: String,
    default: 'basic',
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => [],
  },
})
