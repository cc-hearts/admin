const enUsLocale = {}

Object.values(import.meta.glob('/src/**/locales/en-US.ts')).forEach(
  async (fn) => {
    const data = (await fn()) as { default: Record<string, string> }
    if (data && data.default) {
      Object.assign(enUsLocale, data.default)
    }
  },
)
const common = {
  logout: 'Logout',
  config: 'Config',
}

Object.assign(enUsLocale, {
  common,
})
export default enUsLocale
