import {
  Checkbox,
  Input,
  InputNumber,
  RadioGroup,
  Select,
} from 'ant-design-vue'

export const VERSION = '0.0.1'
interface Options {
  label: string
  value: any
}
export interface FormSchema {
  label: string
  type: string
  name: string
  width?: number
  required?: boolean
  span?: number
  slot?: {
    name: string
    [props: string]: any
  }
  componentProperty?: {
    options?: Options[]
    [props: string]: any
  }
}
export interface FormLayoutProps {
  span: number
  gutter?: number
  labelCol?: Record<string, string | number>
  wrapperCol?: Record<string, string | number>
}
export interface FormProps {
  name?: string
  layout?: FormLayoutProps
  schema?: FormSchema[]
  defaultValue?: Record<PropertyKey, any> | (() => Record<PropertyKey, any>)
  gutter?: number
}
export interface FormExpose {
  validate: () => Promise<[boolean, Record<string, unknown>]>
  getFieldsValue: <T extends Record<PropertyKey, any>>() => T
  setFieldValue: (key: PropertyKey, value: any) => void
  setFieldsValue: (target: Record<PropertyKey, any>) => void
  resetFields: () => void
}
export function initFormValue(schema: FormSchema[]) {
  return schema.reduce((acc, cur) => {
    switch (cur.type) {
      case 'input': {
        Reflect.set(acc, cur.name, '')
        break
      }
    }
    return acc
  }, {})
}
const baseComponentMap = {
  input: Input,
  'input-number': InputNumber,
  radio: RadioGroup,
  select: Select,
  checkbox: Checkbox,
}
export function mapComponentBySchemaComponentName(
  schemaComponentName: string,
): string {
  if (
    Object.prototype.hasOwnProperty.call(baseComponentMap, schemaComponentName)
  ) {
    return Reflect.get(baseComponentMap, schemaComponentName)
  }
  return 'Fragment'
}
