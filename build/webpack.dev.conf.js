var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
const ip = require('quick-local-ip').getLocalIP4();
var merge = require('webpack-merge')
var htmlWebpackAlterAssetPlugin = require('html-webpack-alter-asset-plugin')
var baseWebpackConfig = require('./webpack.base.conf')[0]
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}

module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.join('', ''),
        compress: true,
        hot: true,
        // inline: true,
        port: 9999,
        host: ip,
        public: ip + ':' + '9999' + '',
        // publicPath: '/dist/',
        proxy: {
            '/api': {
            target: 'http://localhost:8000',
            secure: false
            }
        }
    },
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // cheap-source-map is faster for development
    devtool: '#cheap-source-map',
    cache: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: './static/index.html',
        //     favicon: resolveApp('./static/favicon.ico'),
        //     inject: true,
        //     path: config.dev.staticPath,
        //     injectAlter: {
        //         js: { 
        //             keys: [ 'vue/vue.runtime.js' ] 
        //         }
        //     }
        // }),
        // new htmlWebpackAlterAssetPlugin(),
        new FriendlyErrorsPlugin()
    ]
})
