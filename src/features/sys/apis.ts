import { sysPrefix } from '@/features/constant/index'
import { IPagination } from '@/types'
import { Delete, Get, Post, Put } from '@/utils/request'

export interface IAddMenu {
  name: string
  icon: string
  type: string
  path: string
  components: string
  sort: number
}
export default {
  list<T extends IPagination>(params: T) {
    const { data } = Get<Array<IAddMenu & { children?: IAddMenu[] }>>(
      `${sysPrefix}/menu/list`,
      params,
    )
    return data
  },
  addMenu<T extends IAddMenu>(params: T) {
    const { data } = Post(`${sysPrefix}/menu/add`, params)
    return data
  },
  editMenu<T extends IAddMenu>(id: number, params: T) {
    const { data } = Put(`${sysPrefix}/menu/edit/${id}`, params)
    return data
  },
  deleteMenus(params: { id: (number | string)[] }) {
    const { data } = Delete(`${sysPrefix}/menu/delete`, params)
    return data
  },
}

export interface IMenuTree {
  id: number
  name: string
  icon: string
  type: string
  path: null | string
  pid: string
  components: null | string
  sort: number
  meta?: Record<string, unknown>
  children?: IMenuTree[]
}

export function getMenuTree() {
  const { data } = Post<IMenuTree[]>(`${sysPrefix}/menu/tree`)
  return data
}
