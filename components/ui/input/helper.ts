import { random } from '@cc-heart/utils'
const fieldSet = new Set<string>()

const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const generatorField = () =>
  Array.from({ length: 8 })
    .map(() => random(0, str.length))
    .join('')
export const generatorUniqueField = () => {
  let field = generatorField()
  while (fieldSet.has(field)) {
    field = generatorField()
  }

  fieldSet.add(field)
  return field
}
