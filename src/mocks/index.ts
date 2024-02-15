import { setupWorker } from 'msw/browser'
import { getHandlers } from './handles'
import { __IS_DEV__ } from '@/configs'

if (__IS_DEV__) {
  const worker = setupWorker(...getHandlers())
  worker.start()
}
