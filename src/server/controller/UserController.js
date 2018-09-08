const BaseController = require('koa-symphony/src/controller/BaseController');

const toolkit = require('koa-symphony/src/toolkit/index.js');
let emailAuth  = global.symphony.parameters.email.auth.user;

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
      body.locked = 1;
      let user = await this.getUserService().reigster(ctx.request.body);

      let register = {
        userId: user.id,
        time: toolkit.timestamp(),
        code: 'asdfkjqweoijasdkfj',
      };

      let registerKey = toolkit.encryptToBase64('asdfkjqweoijasdkfj');
      let emailBody = {
        from: `"学无止境" <${emailAuth}>`,
        to: user.email,
        subject: '无境网注册成功',
        html: `请点击以下链接，进行邮箱验证<a href="http://47.99.90.167/activate/${registerKey}" target="_blank">激活账号</a>`,
      };
      global.symphony.sendEmail(emailBody);
      ctx.session.data = {
        userId: user.dataValues['id'],
        deadline: toolkit.timestamp() + 24*60*60*30,
        register: register,
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