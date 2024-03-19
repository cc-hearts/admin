import { defaultNamespace } from '@/configs/constants'
import { generateCssNamespaceFn } from '@cc-heart/utils-client'

export const useNamespace = generateCssNamespaceFn(defaultNamespace)
