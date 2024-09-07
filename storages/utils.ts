import type { defineStorage } from '@cc-heart/storage-cache'

let localStorageCache: ReturnType<typeof defineStorage>['localStorageCache'],
  sessionStorageCache: ReturnType<typeof defineStorage>['sessionStorageCache']

if (typeof window !== 'undefined') {
  const { defineStorage } = await import('@cc-heart/storage-cache')

  const storage = defineStorage('admin')

  localStorageCache = storage.localStorageCache
  sessionStorageCache = storage.sessionStorageCache
}

export { localStorageCache, sessionStorageCache }
