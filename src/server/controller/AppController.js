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

  donwLoadCctJson() {
    return async (ctx) => {
      let body = ctx.request.query.data; 
      
      ctx.set('Content-Disposition', 'attachment;filename='+new Date().getTime()+'.json');
      ctx.set('Content-Type', 'application/json;charset=utf-8');
      ctx.body = body;

      return;
    };  
  }

  donwLoadCctText() {
    return async (ctx) => {
      let body = ctx.request.query.data; 
      
      ctx.set('Content-Disposition', 'attachment;filename='+new Date().getTime()+'.text');
      ctx.set('Content-Type', 'application/text;charset=utf-8');
      ctx.body = body;

      return;
    };  
  }
}

module.exports = AppController;