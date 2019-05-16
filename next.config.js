const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withPreact = require('@zeit/next-preact')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const dotenv = require('dotenv-safe')

const env = dotenv.load().parsed

const { BUNDLE_ANALYZE } = process.env

module.exports = withTypescript(
  withSass(
    withBundleAnalyzer(
      withPreact({
        env,
        analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),

        webpack(config) {
          if (config.mode === 'production' && config.optimization.minimizer) {
            config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
          }
          return config
        },
      }),
    ),
  ),
)
