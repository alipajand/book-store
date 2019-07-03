const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: 'http://hiring.bsup.tk/'
  },
  filenameHashing: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: {
    index: {
      entry: [
        'src/mixins/index.js',
        'src/filters/index.js',
        'src/main.js',
        'src/vue.js'
      ]
    }
  },
  configureWebpack: process.env.NODE_ENV === 'production' ? {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            cache: false,
            warnings: false,
            nameCache: null,
            ie8: true,
            safari10: true,
            compress: {
              drop_console: true
            },
            output: {
              comments: false,
              beautify: false
            }
          }
        })
      ]
    },
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        )
      })
    ]
  } : {}
};
