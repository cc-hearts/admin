export type Theme = 'light' | 'dark'

export type CssVariableType<P extends string, T> = T extends `${P}${infer r}`
  ? r
  : never
export type TokenVariables<
  P extends string,
  T extends Record<string, unknown>,
> = {
  [k in keyof T as k extends string ? `--${P}-${k}` : never]: string
}
