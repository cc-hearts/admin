import { FormExpose } from './form'

export function useResetFields(ins: Ref<FormExpose | undefined>) {
  return function () {
    ins.value?.resetFields()
  }
}
