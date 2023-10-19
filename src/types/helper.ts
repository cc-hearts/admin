import { IBaseResponse } from '.'

export type getPromiseType<T> = T extends Promise<infer U> ? U : T

export type getApiType<T extends (...args: any) => any> = getPromiseType<
  ReturnType<T>
> extends IBaseResponse<infer r>
  ? r
  : never
