import { createMockFn } from './utils'

createMockFn('/user/refresh', 'post', () => {
  return {
    code: 0,
    data: {
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
    },
    message: '请求成功',
  }
})

let count = 0
createMockFn('/user/auth', 'post', () => {
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
})
