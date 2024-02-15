import { http, HttpResponse } from 'msw'
import routes from '~pages'

export function getMenuTree() {
  return http.post('http://localhost:5173/api/mock', () => {
    console.log(routes)
    return HttpResponse.json({ code: 200 })
  })
}
