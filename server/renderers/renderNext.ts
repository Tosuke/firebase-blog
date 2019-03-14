import { Server } from 'next'
import { ServerResponse } from 'http'
import httpMocks from 'node-mocks-http'
import { Response } from '../type'

export async function renderNext(app: Server, path: string, query: any): Promise<Response> {
  const req = httpMocks.createRequest({
    method: 'GET',
    url: path,
    query,
  })
  const res = new ServerResponse(req)
  const html = await app
    .renderToHTML(req, res, path, query)
    .catch(err => app.renderErrorToHTML(err, req, res, path, query))
  res.end()
  return {
    status: res.statusCode,
    contentType: 'text/html; charset=utf-8',
    content: new Buffer(html, 'utf8'),
  }
}
