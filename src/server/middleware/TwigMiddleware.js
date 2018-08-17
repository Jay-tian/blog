//初始化模版渲染路径
const views = require('tsj-koa-views');
const parameters = require('../loader/ConfigLoader.js');

let middleware = views(parameters.viewPath,
  {
    extension: 'twig',
    map: {
      html: 'twig',
    },
    options: {
      path: parameters.viewPath,
    }
  }
);

module.exports = {
  priority: 0,
  middleware: middleware,
};