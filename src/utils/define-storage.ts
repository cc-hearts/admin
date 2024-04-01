import { defineStorage } from '@cc-heart/storage-cache'

const { localStorageCache, sessionStorageCache } = defineStorage('admin')

export { localStorageCache, sessionStorageCache }
