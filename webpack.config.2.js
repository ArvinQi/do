var path = require('path')
var webpack = require('webpack')

// web need vue-loader
var plugins = [
  // new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true,
    exclude: 'Vue'
  })
];
function getBaseConfig () {
  return {
    entry: {
      app: [""+path.resolve('src', 'entry.js')]
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loaders: []
        }
      ]
    },
    plugins: plugins
  }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[1].loaders.push('vue-loader')
webConfig.module.rules[1].options = {
  /**
   * important! should use postTransformNode to add $processStyle for
   * inline style normalization.
   */
  compilerModules: [
    {
      postTransformNode: el => {
        el.staticStyle = `$processStyle(${el.staticStyle})`
        el.styleBinding = `$processStyle(${el.styleBinding})`
      }
    }
  ]
}

var nativeConfig = getBaseConfig()
nativeConfig.output.filename = '[name].weex.js'
nativeConfig.module.rules[1].loaders.push('weex-loader')

// const vuxLoader = require('vux-loader')
// webConfig = vuxLoader.merge(webConfig, {
//   options: {},
//   plugins: [{
//     name: 'vux-ui'
//   }]
// })
// nativeConfig = vuxLoader.merge(nativeConfig, {
//   options: {},
//   plugins: [{
//     name: 'vux-ui'
//   }]
// })
module.exports = [webConfig, nativeConfig]
