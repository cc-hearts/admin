import { useReactiveToPromisify } from '~/composables/use-reactive-to-primisify'
import { useFetch } from '@vueuse/core'
import { requestUrl } from '~/configs/request'

export const refreshApi = useReactiveToPromisify(
  () => {
    const response = useFetch<{
      data: { accessToken: string; refreshToken: string }
    }>(
      requestUrl + '/user/refresh',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
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
      },
    )
    return { ...response, watchCallback: () => response.isFinished.value }
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
