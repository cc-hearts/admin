import { useReactiveToPromisify } from '~/composables/use-reactive-to-primisify'
import { useFetch } from '@vueuse/core'
import { requestUrl } from '~/configs/request'
import { getToken } from '~/storages/token'
import { throwError } from '~/utils/error'

export const refreshApi = useReactiveToPromisify(
  () => {
    const response = useFetch<{
      code: number
      data: { accessToken: string; refreshToken: string }
    }>(
      requestUrl + '/user/refresh',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getToken(),
        },
      },
      {
        afterFetch: async (params) => {
          if (
            params.response.headers
              .get('Content-Type')
              ?.includes('application/json')
          ) {
            try {
              params.data = await params.response.json()
              if (params.data.code !== 0) {
                throwError(params.data.message)
              }
            } catch (error) {
              // error
            }
          }
          return params
        },
      },
    )
    return { ...response, watchCallback: () => response.isFinished.value }
  },
  (resolve, reject, response) => {
    watch(
      () => response.isFinished.value,
      (isFinished) => {
        if (isFinished) {
          if (response.data.value?.code === 0) {
            resolve(response)
          } else {
            reject('[refresh error]:' + response)
          }
        }
      },
    )
  },
)
