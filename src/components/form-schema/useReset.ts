import { FormExpose } from './helper'

export function useResetFields(ins: Ref<FormExpose | undefined>) {
  return function () {
    ins.value?.resetFields()
  }
}
