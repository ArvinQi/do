const configs = require('./webpack.config.js');
const webpack = require('webpack');
const ip = require('quick-local-ip').getLocalIP4();
const pathTo = require('path');
const chalk = require('chalk');
let config = Array.isArray(configs) ? configs[0] : configs;
let port = "9999"
config.devServer = {
  contentBase: pathTo.join(__dirname, ''),
  compress: true,
  hot: true,
  port: port,
  host: ip,
  public: ip + ':' + port + '/web',
  // publicPath: '/dist/',
  proxy: {
    '/api': {
      target: 'http://localhost:8000/api',
      secure: false
    }
  }
};
config.plugins.push(new webpack.HotModuleReplacementPlugin());
console.log('server is running! Please open ' + chalk.green('http://' + ip + ':' + port + '/web/index.html'));
module.exports = config;