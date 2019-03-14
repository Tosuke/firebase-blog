import express from 'express'
import next from 'next'
import { createRouter } from './router'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

const app = next({ dev })

app
  .prepare()
  .then(() => {
    const server = express()
    const router = createRouter(app)

    const handler = app.getRequestHandler()
    server.get('/_next/*', (req, res) => {
      handler(req, res)
    })

    server.get('*', async (req, res) => {
      const response = await router.resolve({ pathname: req.path })
      res
        .status(response.status)
        .set('Content-Type', response.contentType)
        .send(response.content)
        .end()
    })

    server.listen(port, (err: unknown) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
