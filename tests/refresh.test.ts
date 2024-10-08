import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createMockFn } from '~/mocks/utils'
import { watch } from 'vue'
const {
  setToken,
  setRefreshToken,
  getMockToken,
  removeTokenFn,
  mockAuthDataFn,
  mockAuthExpiredData,
  mockRefreshData,
  token,
} = vi.hoisted(() => {
  return {
    setToken: vi.fn(),
    setRefreshToken: vi.fn(),
    getMockToken: vi.fn(),
    removeTokenFn: vi.fn(),
    token: { value: 'token' },
    mockAuthDataFn: { value: null as any },
    mockAuthExpiredData: { value: null as any },
    mockRefreshData: { value: null as any },
  }
})

createMockFn('/user/refresh', 'post', () => {
  return mockRefreshData.value
})

createMockFn('/user/auth', 'post', () => {
  return mockAuthDataFn.value?.()
})

createMockFn('/user/authExpired', 'post', () => {
  return mockAuthExpiredData.value
})

vi.mock('~/utils/error', () => {
  return {
    throwError: vi.fn(),
  }
})

vi.mock('~/storages/token', async () => {
  return {
    getToken: () => {
      getMockToken()
      return token.value
    },
    setToken: () => {
      setToken()
      token.value = 'newToken'
    },
    removeToken: () => {
      removeTokenFn()
      token.value = ''
    },
    getRefreshToken: () => 'refreshToken',
    setRefreshToken,
    removeRefreshToken: vi.fn(),
  }
})

describe.sequential('request modules', () => {
  let count = 0

  beforeEach(() => {
    count = 0
    mockRefreshData.value = null
    mockAuthDataFn.value = null
    mockAuthExpiredData.value = null
    token.value = 'token'
  })

  test.sequential('refresh token is expired', async () => {
    return new Promise<void>((resolve) => {
      mockRefreshData.value = {
        code: 401,
        data: 'null',
        message: 'refresh token expired',
      }
      mockAuthExpiredData.value = {
        code: 401,
        data: 'null',
        message: 'token expired',
      }

      const { isFinished, data } = useRequest<{
        code: number
        data: any
        message: string
      }>('/user/authExpired', { method: 'post' })

      watch(
        () => isFinished.value,
        (bool) => {
          if (bool) {
            expect(removeTokenFn).toHaveBeenCalled()
            expect(data.value?.code).toBe(401)
            expect(data.value?.data).toBe('null')
            expect(data.value?.message).toBe('token expired')
            resolve()
          }
        },
      )
    })
  })

  test.sequential('refresh token success', async () => {
    return new Promise<void>((resolve) => {
      mockRefreshData.value = {
        code: 0,
        data: {
          accessToken: 'newAccessToken',
          refreshToken: 'newRefreshToken',
        },
        message: '请求成功',
      }
      mockAuthDataFn.value = () => {
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
      }

      const { data, isFinished } = useRequest<{
        code: number
        data: any
        message: string
      }>('/user/auth', { method: 'post' })

      watch(
        () => isFinished.value,
        () => {
          if (isFinished.value) {
            expect(setToken).toHaveBeenCalled()
            expect(data.value?.code).toBe(0)
            expect(data.value?.data).toEqual({
              accessToken: 'newAccessToken',
              refreshToken: 'newRefreshToken',
            })
            expect(data.value?.message).toBe('请求成功')

            resolve()
          }
        },
      )
    })
  })
})
