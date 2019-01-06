/**
 * @file next-starter-kit
 * @author qijinlong
 */
// const withCss = require('@zeit/next-css');
// const withStylus = require('@zeit/next-stylus');
// const withLess = require('@zeit/next-less');
const withTypescript = require('@zeit/next-typescript');
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.css'] = () => {};
}

module.exports = withTypescript({
    // cssModules: true,
    // cssLoaderOptions: {
    //     importLoaders: 1,
    //     javascriptEnabled: true
    // },
    // lessLoaderOptions: {
    //     importLoaders: 1,
    //     javascriptEnabled: true
    // },
    webpack(config) {
        // Further custom configuration here
        return config;
    }
});
