import fetchMock from 'fetch-mock'

export function handleMock(url: string, responseData: any, headers?: any) {
  let retData =
    typeof responseData === 'function' ? responseData?.() : responseData
  fetchMock.post(location.origin + url, retData, headers)
}
