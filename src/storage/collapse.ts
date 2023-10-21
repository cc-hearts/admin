export function setMenuCollapse(collapse: boolean) {
  localStorage.setItem('menuCollapse', String(collapse))
}

export function getMenuCollapse() {
  return localStorage.getItem('menuCollapse') === 'true'
}
