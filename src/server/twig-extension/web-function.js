let parameters = require('koa-symphony/src/loader/ConfigLoader.js');
const webpackConfig = require(parameters.rootPath+'/webpack/setting.js');
const assets = 'production' == parameters.env ? require(webpackConfig.output+'webpack.assets.json') : {};

module.exports = {
  asset: function(url) {
    if ('development' == parameters.env) {
      return url;
    }

    let rootPath = parameters.distAddress ? parameters.distAddress : '';
    try {
      let urls = url.replace(webpackConfig.publicPath, '').split('.');
      return rootPath + assets[urls[0]][urls[1]];
    } catch (error) {
      return rootPath + url;
    }
  },
  scripts: function(list, targets) {   
    let keys = targets['_keys'];

    for(let i = 0; i < keys.length; i++ ) {
      if (undefined != targets[keys[i]]) {
        list[keys[i]] = typeof(targets[keys[i]]) == 'string' ? [targets[keys[i]]] : targets[keys[i]];
      } else {
        let item = typeof(targets[keys[i]]) == 'string' ? [targets[keys[i]]] : targets[keys[i]];
        list[keys[i]] = list[keys[i]].concat(item);
      }
    }
  }
};