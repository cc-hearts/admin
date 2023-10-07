export interface ILoginApi {
  accessToken: string
  refreshToken: string
}

export interface ILoginParams {
  username: string
  password: string
}

export interface Profile {
  uid: number
  name: string
  username: string
  plain: string
  iat: number
  exp: number
}
