// import { buildProps } from '@/utils/props'
import { PropType } from 'vue'

interface Options {
  label: string
  value: any
}

export interface FormColumn {
  label: string
  type: string
  name: string
  width?: number
  fixed?: 'left' | 'right'
  slot?: { name: string; [props: string]: any }
  extra?: { [props: string]: any }
  options?: Options[]
}

export interface FormProps {
  name?: string
  labelCol?: { span: number }
  columns?: FormColumn[]
  defaultValue?: Record<string, any>
  rules?: Record<string, any>
}

export interface FormExpose {
  validate: () => Promise<[boolean, Record<string, unknown>]>
  getFieldsValue: <T extends Record<PropertyKey, any>>() => T
  setFieldValue: (key: PropertyKey, value: any) => void
  setFieldsValue: (target: Record<PropertyKey, any>) => void
  resetFields: () => void
}

export default ({
  name: {
    type: String,
    default: 'basic',
  },
  labelCol: {
    type: Object,
    default: () => ({ span: 5 }),
  },
  columns: {
    type: Array as PropType<FormColumn[]>,
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
