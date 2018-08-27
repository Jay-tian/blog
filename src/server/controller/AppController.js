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
      return ctx.render('common/system/coding.twig', {
      });
    };    
  }
}

module.exports = AppController;