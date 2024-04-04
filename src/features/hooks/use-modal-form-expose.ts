import { createSetFieldsFactory } from '@/components/form-schema/utils/create-set-fields-factory'
import { createResetFactory } from '@/components/form-schema/utils/create-reset-factory'
import type { fn } from '@cc-heart/utils/helper'
import type { FormExpose } from '@/components/form-schema/helper'
import { type Ref } from 'vue'

export interface ModalFormExpose {
  setFieldsValue: (target: Record<string, any>) => Promise<void>
  resetFields: () => void
}
export function useModalFormExpose(
  formInstanceRef: Ref<FormExpose | undefined>,
  extensionFunc?: (name: keyof ModalFormExpose, target: fn) => fn | void,
) {
  const exposedResult: ModalFormExpose = {
    setFieldsValue: createSetFieldsFactory(formInstanceRef),
    resetFields: createResetFactory(formInstanceRef),
  }
  if (extensionFunc instanceof Function) {
    Object.keys(exposedResult).forEach((key) => {
      const k = key as keyof typeof exposedResult
      exposedResult[k] = extensionFunc(k, exposedResult[k]) || exposedResult[k]
    })
  }
  return exposedResult
}
