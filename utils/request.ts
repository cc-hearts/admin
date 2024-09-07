import { createFetch } from '@vueuse/core'
import { refreshApi } from '~/apis'
import { requestUrl } from '~/configs/request'
import { throwError } from './error'
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from '~/storages/token'
import { useErrorMessage } from '~/components'

const useFetch = createFetch({
  baseUrl: requestUrl,
  options: {
    async beforeFetch({ options, url, cancel }) {
      const token = getToken()
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      } else {
        useErrorMessage(
          `The request is canceled because the token does not exist. url: ${url}`,
        )
        cancel()
      }

      return { options }
    },
    async afterFetch(params) {
      if (
        params.response.headers
          .get('Content-Type')
          ?.includes('application/json')
      ) {
        params.data = await params.response.json()
        if (params.data.code !== 0) {
          // refresh token
          if (params.data.code === 401 && getRefreshToken()) {
            try {
              const request = await refreshApi()
              const { accessToken, refreshToken } = request.data.value.data
              setToken(accessToken)
              setRefreshToken(refreshToken)
            } catch (error) {
              removeToken()
              removeRefreshToken()
              // TODO: redirect to login
              throwError(`[refresh token]: ${error?.toString()}`)
            }
          } else {
            throwError(params.data.message)
          }
        }
      }
      return params
    },
  },
})

export function useRequest<T>(...rest: Parameters<typeof useFetch>) {
  const {
    onFetchResponse,
    isFetching: _isFetching,
    isFinished: _isFinished,
    onFetchError,
    data,
    execute,
    ...otherParams
  } = useFetch<T>(...rest)
  const isFetching = ref(true)
  const isFinished = ref(false)

  onFetchResponse(async (ctx) => {
    try {
      if (ctx.headers.get('Content-Type') === 'application/json') {
        const response = data.value as { code: number } | null
        if (response?.code === 401) {
          await execute()
        }
      }
    } finally {
      isFetching.value = false
      isFinished.value = true
    }
  })
  onFetchError(() => {
    isFetching.value = false
    isFinished.value = true
  })
  return {
    onFetchResponse,
    onFetchError,
    isFetching,
    isFinished,
    data,
    ...otherParams,
  }
}
