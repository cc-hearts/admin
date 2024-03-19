import fetchMock from 'fetch-mock'

export function handleMock(url: string, responseData: any, headers?: any) {
  fetchMock.post(location.origin + url, responseData, headers)
}
