let parameters = require('koa-symphony/src/loader/ConfigLoader.js');
const webpackConfig = require(parameters.rootPath+'/webpack/setting.js');
const assets = 'production' == parameters.env ? require(webpackConfig.output+'webpack.assets.json') : {};

module.exports = {
  asset: function(url) {
    if ('development' == parameters.env) {
      return url;
    }

    let rootPath = parameters.distAddress ? parameters.distAddress : '';
    url = rootPath + url;
    url = url.replace(webpackConfig.publicPath, '');
    let urls = url.split('.');
    try {
      return assets[urls[0]][urls[1]];
    } catch (error) {
      return url;
    }
  }
};