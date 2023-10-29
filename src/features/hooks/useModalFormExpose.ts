import { FormExpose } from '@/components/form/form'
import { useFormSetFields } from '@/components/form/useFormSetFields'
import { useResetFields } from '@/components/form/useReset'
import { useExposed } from '@/hooks/useExposed'
import { fn } from '@cc-heart/utils/helper'
import { type Ref } from 'vue'

export interface ModalFormExpose {
  setFieldsValue: (target: Record<string, any>) => Promise<void>
  resetFields: () => void
}
export function useModalFormExpose(
  ins: Ref<FormExpose | undefined>,
  pipe?: (name: keyof ModalFormExpose, target: fn) => fn | void,
) {
  const exposed: ModalFormExpose = {
    setFieldsValue: useFormSetFields(ins),
    resetFields: useResetFields(ins),
  }
  if (pipe instanceof Function) {
    Object.keys(exposed).forEach((key) => {
      const k = key as keyof typeof exposed
      exposed[k] = pipe(k, exposed[k]) || exposed[k]
    })
  }
  useExposed(exposed)
}
