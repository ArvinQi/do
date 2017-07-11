var path = require('path');
var utils = require('./utils');
var config = require('../config');
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var src = path.resolve(__dirname, '../src');
var banner = '// { "framework": "Vue" }\n'

var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
})

function getBaseConfig() {
    return {
        entry: {
            index: path.resolve('src', 'entry.js')
        },
        output: {
            path: config.build.assetsRoot,
            filename: '[name].web.js',
            publicPath: process.env.NODE_ENV !== 'development' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'src': path.resolve(__dirname, '../src'),
                'assets': path.resolve(__dirname, '../src/assets'),
                'components': path.resolve(__dirname, '../src/components'),
                'views': path.resolve(__dirname, '../src/views'),
                'styles': path.resolve(__dirname, '../src/styles'),
                'api': path.resolve(__dirname, '../src/api'),
                'utils': path.resolve(__dirname, '../src/utils'),
                'store': path.resolve(__dirname, '../src/store'),
                'router': path.resolve(__dirname, '../src/router'),
                'mock': path.resolve(__dirname, '../src/mock'),
                'vendor': path.resolve(__dirname, '../src/vendor'),
                'static': path.resolve(__dirname, '../static')
            }
        },
        externals: {
            // jquery: 'jQuery'
        },
        module: {
            rules: [
                // {
                //     test: /\.(js|vue)$/,
                //     loader: 'eslint-loader',
                //     enforce: "pre",
                //     include: [resolve('src'), resolve('test')],
                //     options: {
                //         formatter: require('eslint-friendly-formatter')
                //     }
                // },
                {
                    test: /\.vue(\?[^?]+)?$/,
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader?cacheDirectory',
                    include: [resolve('src'), resolve('test')]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            ]
        },
        plugins: [bannerPlugin]
        //注入全局mixin
        // sassResources: path.join(__dirname, '../src/styles/mixin.scss'),
        // sassLoader: {
        //     data:  path.join(__dirname, '../src/styles/index.scss')
        // },
    }
}
const webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[0].loader = 'vue-loader'

const nativeConfig = getBaseConfig()
nativeConfig.output.filename = '[name].weex.js'
nativeConfig.module.rules[0].loader = 'weex-loader'
module.exports = [webConfig, nativeConfig]