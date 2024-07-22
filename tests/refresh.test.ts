import { useRequest } from '../utils/request'
import { describe, expect, test, vi } from 'vitest'
const { setToken, setRefreshToken } = vi.hoisted(() => {
  return {
    setToken: vi.fn(),
    setRefreshToken: vi.fn(),
  }
})
vi.mock('~/storages/token', () => {
  return {
    getToken: () => {
      return 'token'
    },
    setToken,
    removeToken: vi.fn(),
    getRefreshToken: () => 'refreshToken',
    setRefreshToken,
    removeRefreshToken: vi.fn(),
  }
})

describe('request modules', () => {
  test('refresh token', () => {
    return new Promise<void>((resolve) => {
      const { data, isFinished } = useRequest('/user/auth', { method: 'post' })
      watch(
        () => isFinished.value,
        (bool) => {
          if (bool) {
            expect(setToken).toHaveBeenCalled()
            resolve()
          }
        },
      )
    })
  })
})
