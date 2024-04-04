import { FormExpose } from '../helper'

export function createResetFactory(ins: Ref<FormExpose | undefined>) {
  return function () {
    ins.value?.resetFields()
  }
}
