const parameters = require('./ConfigLoader.js');
const glob = require('glob');
const path = require('path');
const Router = require('koa-router');

let routerPaths = glob.sync(path.join(parameters.serverPath, 'router/*.json'));
let routers = [];
let controllers = require('./ControllerLoader.js');

routerPaths.forEach(function(rts){
  rts = require(rts);
  let options = Object.assign({profix: '/'}, rts.options);
  delete rts['options'];
  
  let router = new Router({
    prefix: options.profix
  });


  for(let methodName in rts) {
    let data = rts[methodName];
    let methods = data.methods || ['get'];
    let controller = controllers[data.controller];

    let middleware = controller[methodName]();
    router.register(data.path, methods, middleware, {
      name: methodName,
    });

    routers.push(router);
  }
});

module.exports = routers;