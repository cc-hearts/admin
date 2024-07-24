import { cssNamespace, cssToken } from '~/configs/theme'
import type { CssVariableType, TokenVariables } from '~/types'

export const useTokens = (
  cssVariableList: Array<
    CssVariableType<typeof cssNamespace, keyof typeof cssToken>
  >,
) => {
  return cssVariableList.reduce(
    (acc, cssName) => {
      const val = cssToken[`${cssNamespace}${cssName}`]

      if (!val) {
        console.warn(`[${cssName}}] Invalid css variable`)
      }

      Reflect.set(acc, `--${cssNamespace}-${cssName}`, val)
      return acc
    },
    {} as TokenVariables<typeof cssNamespace, typeof cssToken>,
  )
}
