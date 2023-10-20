import { Get, Post } from '@/utils/request'
import { sysPrefix } from '@/features/constant/index'
import { IPagination, ITableResponse } from '@/types'

interface IAddMenu {
  name: string
  icon: string
  type: string
  path: string
  components: string
  sort: number
}
export default {
  list<T extends IPagination>(params: T) {
    const { data } = Get<ITableResponse<IAddMenu & { id: number }>>(
      `${sysPrefix}/menu/list`,
      params,
    )
    return data
  },
  addMenu<T extends IAddMenu>(params: T) {
    const { data } = Post(`${sysPrefix}/menu/add`, params)
    return data
  },
}
