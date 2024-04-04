import { Ref, watch } from 'vue'
import { FormExpose } from '../helper'
import { fn } from '@cc-heart/utils/helper'
export function createSetFieldsFactory(ins: Ref<FormExpose | undefined>) {
  const taskList: Array<fn> = []
  let isIns = false
  const flush = () => {
    const task = taskList.slice()
    task.forEach((fn) => {
      fn instanceof Function && fn()
    })
  }
  return async function (target: Record<string, any>) {
    watch(
      () => ins.value,
      (val) => {
        if (val && !isIns) {
          isIns = true
          flush()
        }
      },
      {
        immediate: true,
      },
    )
    if (!ins.value) {
      taskList.push(() => ins.value?.setFieldsValue(target))
    } else {
      ins.value.setFieldsValue(target)
    }
  }
}
