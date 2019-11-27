const BaseController = require('koa-symphony/src/controller/BaseController');
const fs = require('fs');
const os = require('os');
const path = require('path');
const qr = require('qr-image');

class AppController extends BaseController {
  constructor(){
    super();
  }

  apps() {
    return async (ctx) => {
      let code = ctx.params.id;
      return ctx.render(`app/list.twig`, {
      });
    };  
  }

  showApp() {
    return async (ctx) => {
      let code = ctx.params.id;
      return ctx.render(`app/${code}.twig`, {
      });
    };    
  }

  qr() {
    return async (ctx) => {
      var code = qr.image("https://www.tianshengjie.cn", {type: 'png'});
      ctx.set('Content-Type', 'image/png');
      ctx.body = code;

      return;
    }; 
  }

  donwLoadCctJson() {
    return async (ctx) => {
      ctx.body = ctx.request.body.data; 
      ctx.set('Content-Disposition', 'attachment;filename='+new Date().getTime()+'.json');
      ctx.set('Content-Type', 'application/json;charset=utf-8');

      return;
    };  
  }

  donwLoadCctText() {
    return async (ctx) => {
      ctx.body = ctx.request.body.data; 
      ctx.set('Content-Disposition', 'attachment;filename='+new Date().getTime()+'.text');
      ctx.set('Content-Type', 'application/text;charset=utf-8');

      return;
    };  
  }
}

module.exports = AppController;