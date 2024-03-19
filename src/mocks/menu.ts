import { handleMock } from './handles'
import routes from '~pages'

handleMock('/api/rbac/menu/tree', {
  code: 200,
  data: routes,
})
