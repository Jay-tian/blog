const BaseController = require('koa-symphony/src/controller/BaseController');
const fs = require('fs');
const os = require('os');
const path = require('path');

class MyController extends BaseController {
  constructor(){
    super();
  }

  myArticles() {
    return async (ctx) => {
      return ctx.render('common/system/coding.twig', {
      });
    };    
  }
}

module.exports = MyController;