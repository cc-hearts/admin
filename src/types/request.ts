export interface IBaseResponse<T = any> {
  code: number
  message: string
  data?: T
  path?: string
  timestamp?: string
}

export interface IPagination {
  pageNum: number
  pageSize: number
}

export type ITableResponse<T = any> = {
  dataSource: T[]
  total: number
}
