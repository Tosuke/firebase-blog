const willServer = require('./server')

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

willServer.then(server => {
  server.listen(port, err => {
    if(err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})