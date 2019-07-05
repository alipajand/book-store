const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  devServer: {
    proxy: 'http://hiring.bsup.tk/api/'
  },
  filenameHashing: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: {
    index: {
      entry: [
        'src/main.js',
        'src/vue.js'
      ]
    }
  },

  /**
   * production configs
   */
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
      /**
       * add gzip in deploy
       */
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
