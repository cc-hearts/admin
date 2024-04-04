import { describe, it, vi, expect, beforeEach } from 'vitest'
import { getProfile } from '@/features/user/api'
vi.mock('@/configs', () => {
  return {
    __IS_DEV__: true,
  }
})

vi.mock('@/utils/request', async (importOriginal) => {
  const mod = (await importOriginal()) as {}
  return {
    ...mod,
    getRouter: () => {
      return { router: { push: vi.fn() } }
    },
  }
})

vi.mock('@/storage', () => {
  return {
    getRefreshToken: () => '123',
    setRefreshToken: () => vi.fn(),
    clearRefreshToken: () => vi.fn(),
    clearToken: () => vi.fn(),
    getAccessToken: () => vi.fn(),
    setAccessToken: () => vi.fn(),
    getToken: () => 1,
    setToken: () => vi.fn(),
  }
})

vi.mock('@/store/profile', () => {
  return {
    clearProfile: vi.fn(),
  }
})

// test refreshToken Api
describe('refreshToken Api', () => {
  let refreshCount = 0
  beforeEach(() => {
    let count = 1
    // @ts-ignore
    fetch.mockIf(/userInfo|refresh/, (req) => {
      if (req.url.endsWith('userInfo')) {
        const code = count > 1 ? 200 : 401
        count++
        return {
          body: JSON.stringify({ code, data: 'mockData' }),
        }
      } else if (req.url.endsWith('refresh')) {
        refreshCount++
        return {
          body: JSON.stringify({
            code: 200,
            data: { refreshToken: 'refresh_token__123' },
          }),
        }
      }

      return {
        body: JSON.stringify({ code: 404, message: 'not found' }),
      }
    })
  })
  it('should refresh token when token is expired', async () => {
    const [ret, ret1, ret2] = await Promise.all([
      getProfile(),
      getProfile(),
      getProfile(),
    ])
    expect(ret.data).toBe('mockData')
    expect(ret1.data).toBe('mockData')
    expect(ret2.data).toBe('mockData')
    expect(refreshCount).toBe(1)
  })
})
