const BaseController = require('koa-symphony/src/controller/BaseController');
const crypto = require('crypto');
const toolkit = require('koa-symphony/src/toolkit/index.js');

class UserController extends BaseController {
  constructor(){
    super();
  }

  showUser() {
    return async (ctx) => {
      return ctx.render('common/system/coding.twig', {
      });
    };
  }

  login() {
    return async (ctx, next) => {
      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        let user = await this.getUserService().login(body);
        if (user) {
          ctx.session.data = {
            userId: user.get('id'),
          };

          ctx.redirect('/');
        }
      } 

      return ctx.render('login/index.twig');
    };
  }

  register() {
    return async (ctx, next) => {
      let body = ctx.request.body;
      body.registerIp = ctx.ip;
      let user = await this.getUserService().reigster(ctx.request.body);

      ctx.session.data = {
        userId: user.dataValues['id'],
        deadline: toolkit.timestamp() + 24*60*60*30,
      };

      ctx.redirect('/');
      return;
    };
  }

  logout() {
    return async (ctx, next) => {
      this.sessionService().deleteById(ctx.session.id);
      ctx.redirect('/');
      return;
    };
  }

  sessionService() {
    return this.createService('system/SessionService');
  }
}

module.exports = UserController;