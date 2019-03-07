const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')

const env = {
  title: 'Tosuke\'s weblog',
  description: '役に立{つ,たない}技術情報やポエム'
}

module.exports = withTypescript(withSass({ env }))