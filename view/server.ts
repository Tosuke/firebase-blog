import express from 'express'
import next from 'next'
import '@zeit/next-preact/alias'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

const app = next({
  dev,
  dir: './view'
})

app
  .prepare()
  .then(() => {
    const server = express()

    const handler = app.getRequestHandler()
    server.get('*', (req, res) => handler(req, res))

    server.listen(port, (err: unknown) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })