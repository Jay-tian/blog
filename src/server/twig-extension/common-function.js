const parameters = require('../loader/ConfigLoader.js');
const routers = require('../loader/RouterLoader.js');
const webpackConfig = require(parameters.rootPath+'/webpack/setting.js');
const assets = 'production' == parameters.env ? require(webpackConfig.output+'webpack.assets.json') : {};

module.exports = {
  asset: function(url) {
    let rootPath = parameters.distAddress ? parameters.distAddress : '';
    url = rootPath + url;
    if ('development' == parameters.env) {
      return url;
    }
    
    url = url.replace(webpackConfig.publicPath, '');
    let urls = url.split('.');
    
    return assets[urls[0]][urls[1]];
  },
  url: function(url) {
    let path;
    routers.every(function(router) {
      path = router.url(url);
      return path instanceof Error;
    });

    return path instanceof Error ? '/' : path;
  }
};