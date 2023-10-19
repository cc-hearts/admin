import { isFn } from '@cc-heart/utils'
import { PropType } from 'vue'

export type propTypes<
  Type,
  ValidateField,
  Default,
  Required extends boolean,
> = {
  type: Type
  validateField?: ValidateField
  default?: Default
  required?: Required
  validator?: ((val: any) => val is ValidateField) | ((val: any) => boolean)
}

type buildPropsType<Type, ValidateField, Default, Required> = {
  readonly type: Type
  readonly default: Default
  readonly validator:
    | ((val: any) => val is ValidateField)
    | ((val: any) => boolean)
  readonly required: Required
}

export const buildProp = <
  Type,
  Default,
  ValidateField extends readonly unknown[] = readonly unknown[],
  Required extends boolean = false,
>(
  prop: propTypes<Type, ValidateField, Default, Required>,
) => {
  const { type } = prop
  const _validator = (val: unknown): boolean => {
    if (isFn(prop.validator)) {
      return prop.validator(val)
    }
    return true
  }
  return {
    type: type as PropType<Type>,
    validator: _validator,
    required: !!prop.required,
    default: prop.default,
  }
}

export const buttonProps = {
  type: {
    type: String,
    validateField: ['21asd'] as const,
  },
}

type inferPropsTypes<T> = T extends propTypes<
  infer Type,
  infer ValidateField,
  infer Default,
  infer Required
>
  ? buildPropsType<Type, ValidateField, Default, Required>
  : never
export const buildProps = <
  T extends Record<string, propTypes<any, any, any, any>>,
>(
  props: T,
): {
  [k in keyof T]: inferPropsTypes<T[k]>
} => {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      key as keyof T,
      buildProp(value),
    ]),
  ) as any
}
