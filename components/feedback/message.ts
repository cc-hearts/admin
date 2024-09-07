import { message } from 'ant-design-vue'
import { noop } from '@cc-heart/utils'
import type { Fn } from '@cc-heart/utils/helper'
import type { VNode } from 'vue'

type MessageType = 'success' | 'error' | 'info' | 'warning'
type MessageContent = string | VNode
interface MessageOptions {
  duration?: number
  onClose?: Fn
}

const useMessage = (
  type: MessageType,
  content: MessageContent,
  options: MessageOptions = {},
) => {
  const { duration = 3, onClose = noop } = options
  message[type]?.(content, duration, onClose)
}

const [useSuccessMessage, useWarningMessage, useInfoMessage, useErrorMessage] =
  (['success', 'warning', 'info', 'error'] as const).map((type) => {
    return (content: MessageContent, options?: MessageOptions) => {
      useMessage(type, content, options)
    }
  })

export {
  useWarningMessage,
  useMessage,
  useSuccessMessage,
  useInfoMessage,
  useErrorMessage,
}
