import { ServerResponse } from 'http'
import httpMocks from 'node-mocks-http'
import next from 'next'
import router from '../router'

const app = next({ dev: false })
const prepareAppTask = app.prepare()

export async function renderToString(path: string): Promise<string> {
  await prepareAppTask
  const [nextPath, queries] = await router.resolve({ pathname: path })
  const req = httpMocks.createRequest({
    method: 'GET',
    url: path
  })
  const res = new ServerResponse(req)
  const html = await app.renderToHTML(req, res, nextPath, { ...queries });
  res.end()
  return html
}
