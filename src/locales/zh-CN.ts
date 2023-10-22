const zhCNLocale = {}

Object.values(import.meta.glob('/src/**/locales/zh-CN.ts')).forEach(
  async (fn) => {
    const data = (await fn()) as { default: Record<string, string> }
    if (data && data.default) {
      Object.assign(zhCNLocale, data.default)
    }
  },
)
const common = {
  logout: '退出登录',
  config: '配置',
}

Object.assign(zhCNLocale, {
  common,
})

export default zhCNLocale
