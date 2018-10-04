const { Nuxt } = require('nuxt')
const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

process.env.DEBUG = 'nuxt:*'

module.exports = (req, res) => {
  nuxt.renderRoute(req.url).then(result => {
    res.send(result.html)
    res.end()
  })
}
