const BaseController = require('./BaseController');
const crypto = require('crypto');
const toolkit = require('../../common/toolkit.js');

class UserController extends BaseController {
  constructor(){
    super();
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
      ctx.redirect('back', '/');
      return;
    };
  }

  sessionService() {
    return this.createService('system/SessionService');
  }
}

module.exports = UserController;