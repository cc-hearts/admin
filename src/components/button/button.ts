import { buildProps } from '@/utils/props'

export const buttonProps = buildProps({
  type: {
    type: String,
    validateField: ['primary', 'dashed', 'danger', 'default', 'flat'] as const,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validateField: ['mini', 'small', 'default'],
    default: 'small',
  },
})
