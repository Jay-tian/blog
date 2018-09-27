const BaseController = require('koa-symphony/src/controller/BaseController');
const fs = require('fs');
const os = require('os');
const path = require('path');

class AppController extends BaseController {
  constructor(){
    super();
  }

  showApp() {
    return async (ctx) => {
      let code = ctx.params.id;
      return ctx.render(`app/${code}.twig`, {
      });
    };    
  }
}

module.exports = AppController;