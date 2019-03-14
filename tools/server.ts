import express from 'express'
import next from 'next'
import router from '../functions/src/router'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

process.env.isServer = 'true'

const app = next({ dev })

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      const [path, queries] = router.resolve({ pathname: req.path })
      app.render(req, res, path, { ...queries, ...req.query })
    })

    server.listen(port, (err: unknown) => {
      if(err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
