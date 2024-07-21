import { defineOnceFn } from '@cc-heart/utils'
import fetchMock from 'fetch-mock'
import { requestUrl } from '~/configs/request'

defineOnceFn(() => {
  fetchMock.post(
    requestUrl + '/user/refresh',
    () => {
      return {
        code: 0,
        data: {
          accessToken: 'newAccessToken',
          refreshToken: 'newRefreshToken',
        },
        message: '请求成功',
      }
    },
    { overwriteRoutes: true },
  )

  let count = 0
  fetchMock.post(
    requestUrl + '/user/auth',
    () => {
      const refreshFlag = ++count % 2 === 0
      if (refreshFlag) {
        return {
          code: 0,
          data: {
            accessToken: 'newAccessToken',
            refreshToken: 'newRefreshToken',
          },
          message: '请求成功',
        }
      }
      return {
        code: 401,
        data: 'null',
        message: 'token expired',
      }
    },
    { overwriteRoutes: true },
  )
})()
