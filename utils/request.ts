import { createFetch, useFetch as _useFetch } from '@vueuse/core'
import { useReactiveToPromisify } from '~/composables/use-reactive-to-primisify'
import { requestUrl } from '~/configs/request'

const refreshApi = useReactiveToPromisify(
  () => {
    return _useFetch(requestUrl + '/user/refresh', {
      method: 'POST',
      afterFetch: async (params) => {
        if (
          params.response.headers
            .get('Content-Type')
            ?.includes('application/json')
        ) {
          params.data = await params.response.json()
          if (params.data.code !== 0) {
            throw new Error(params.data.message)
          }
        }
        return params
      },
    })
  },
  (resolve, reject, response) => {
    watchEffect(() => {
      if (response.isFinished.value) {
        if (response.error.value) {
          reject(response.error.value)
        } else {
          resolve(response)
        }
      }
    })
  },
)
export const useFetch = createFetch({
  baseUrl: requestUrl,
  options: {
    async beforeFetch({ options }) {
      // TODO:
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
          if (params.data.code === 401) {
            try {
              const data = await refreshApi()
              // TODO:

              // return
            } catch (error) {
              throw new Error(`[refresh token]: ${error?.toString()}`)
            }
          } else {
            throw new Error(params.data.message)
          }
        }
      }
      return params
    },
  },
})
