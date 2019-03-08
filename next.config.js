const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const dotenv = require('dotenv-safe')

const env = dotenv.load().parsed

const { BUNDLE_ANALYZE } = process.env

module.exports = withTypescript(
  withSass(
    withBundleAnalyzer({
      env,
      analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),
    }),
  ),
)
