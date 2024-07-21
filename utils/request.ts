import { createFetch } from '@vueuse/core'
import { refreshApi } from '~/apis'
import { requestUrl } from '~/configs/request'
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from '~/storages/token'

const useFetch = createFetch({
  baseUrl: requestUrl,
  options: {
    async beforeFetch({ options }) {
      const token = getToken()
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      }

      return { options }
    },
    async afterFetch(params) {
      try {
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
                if (request.data) {
                  const { accessToken, refreshToken } = request.data
                  setToken(accessToken)
                  setRefreshToken(refreshToken)
                } else {
                  removeToken()
                  removeRefreshToken()
                  // TODO: redirect to login
                }
              } catch (error) {
                throw new Error(`[refresh token]: ${error?.toString()}`)
              }
            } else {
              throw new Error(params.data.message)
            }
          }
        }
        return params
      } finally {
        //
      }
    },
  },
})

export function useRequest(...rest: Parameters<typeof useFetch>) {
  const {
    onFetchResponse,
    isFetching: _isFetching,
    isFinished: _isFinished,
    onFetchError,
    execute,
    ...otherParams
  } = useFetch(...rest)
  const isFetching = ref(true)
  const isFinished = ref(false)
  onFetchResponse(async (ctx) => {
    try {
      if (ctx.headers.get('Content-Type') === 'application/json') {
        // @ts-expect-error: error
        const response = await ctx._fmResults.json
        if (response?.code === 401) {
          await execute()
        }
      }
    } finally {
      isFetching.value = false
      isFinished.value = true
    }
  })
  return { onFetchResponse, isFetching, isFinished, ...otherParams }
}
