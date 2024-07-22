import type { Fn } from '@cc-heart/utils/helper'
import fetchMock from 'fetch-mock'
import { requestUrl } from '~/configs/request'
import type { MockMethodType } from '~/types/mock'

export function createMockFn(
  url: string,
  method: MockMethodType,
  callback: Fn,
) {
  fetchMock[method](`${requestUrl}${url}`, callback, { overwriteRoutes: true })
}
