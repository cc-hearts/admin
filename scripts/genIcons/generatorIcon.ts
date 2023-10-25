import AntDesignVueIcon from '@ant-design/icons-vue'
import { writeFile } from 'fs/promises'
import { resolve as _resolve } from 'path'

function resolve(...path: string[]) {
  return _resolve(process.cwd(), ...path)
}

function filterIconList(iconName: string) {
  return Object.keys(AntDesignVueIcon).filter((key) => key.includes(iconName))
}

function generatorImportStatement(iconStr: string) {
  return `export {\n\t${iconStr}\n} from '@ant-design/icons-vue'`
}

async function writeToFile(str: string, path: string) {
  writeFile(path, str)
}

;(function bootstrap() {
  ;['Outlined', 'Filled', 'TwoTone'].forEach((iconName) => {
    const iconListName = filterIconList(iconName)
    const importStatement = generatorImportStatement(iconListName.join(',\n\t'))
    writeToFile(
      importStatement,
      resolve(`./src/features/components/icon/${iconName}.ts`),
    )
  })
})()
