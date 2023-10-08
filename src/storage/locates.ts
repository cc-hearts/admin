type locates = 'zh-CN' | 'en-US'
export function getLocates() {
  return localStorage.getItem('locates') as locates
}

export function setLocates(locates: string) {
  localStorage.setItem('locates', locates)
}
