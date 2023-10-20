import { reactive } from 'vue'

interface ModalProps {
  visible: boolean
  title: string
  okText: string
  cancelText: string
}

export function defineModal(data: Partial<ModalProps> = {}) {
  return reactive({
    visible: false,
    title: '',
    okText: '确定',
    cancelText: '取消',
    ...data,
  })
}
