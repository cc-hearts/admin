import { FormExpose } from '@/components/form/form'
import { useFormSetFields } from '@/components/form/useFormSetFields'
import { useResetFields } from '@/components/form/useReset'
import { fn } from '@cc-heart/utils/helper'
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
    setFieldsValue: useFormSetFields(formInstanceRef),
    resetFields: useResetFields(formInstanceRef),
  }
  if (extensionFunc instanceof Function) {
    Object.keys(exposedResult).forEach((key) => {
      const k = key as keyof typeof exposedResult
      exposedResult[k] = extensionFunc(k, exposedResult[k]) || exposedResult[k]
    })
  }
  return exposedResult
}
