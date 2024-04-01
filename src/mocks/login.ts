import { handleMock } from './handles'

let mockAccessTokenCount = 0,
  mockRefreshTokenCount = 0
handleMock('/api/rbac/user/login', () => {
  mockAccessTokenCount++
  mockRefreshTokenCount++
  return {
    code: 200,
    data: {
      accessToken: `__access_token__${mockAccessTokenCount}`,
      refreshToken: `__refresh_token__${mockRefreshTokenCount}`,
    },
  }
})
