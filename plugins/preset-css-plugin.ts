import { extractStyle } from 'ant-design-vue/lib/_util/static-style-extract'
import { writeFile } from 'fs/promises'

export const generatorStyles = () => {
  const css = extractStyle()
  return writeFile('./assets/scss/ant-design-vue.css', css, 'utf-8')
}
