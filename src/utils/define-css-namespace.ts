import { defaultNamespace } from '@/configs'
import { generateCssNamespaceFn } from '@cc-heart/utils-client'

export const defineCssNamespace = generateCssNamespaceFn(defaultNamespace)
