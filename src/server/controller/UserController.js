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
      let protocol = ctx.protocol;
      let domain = protocol+'://'+ctx.hostname;

      let body = ctx.request.body;
      body.locked = 1;
      body.registerIp = ctx.ip;
      let user = await this.getUserService().reigster(body);
      let deadline = toolkit.timestamp() + 24*60*60*30;
      let registerValidateKey = encodeURIComponent(toolkit.encryptToBase64(`${ctx.session.id}:${toolkit.randomNum(10)}:${deadline}`));
      
      ctx.session.data = {
        userId: user.dataValues['id'],
        deadline: deadline,
        registerValidateKey
      };

      let emailBody = {
        from: `"学无止境" <${emailAuth}>`,
        to: user.email,
        subject: '无境网注册成功',
        html: this._registerValidateEmailBody(user, domain, registerValidateKey),
      };
      global.symphony.sendEmail(emailBody);

      ctx.redirect('/');
      return;
    };
  }

  registerEmailValidate() {
    return async (ctx, next) => {
      let token = toolkit.decryptFromBase64(ctx.request.query.token);
      let params = token.split(':');
      let message = '';
      let session = await this.sessionService().getById(params[0]);
      
      if (toolkit.timestamp() > params[2]) {
        message = '校验时间超时!';
      }

      if (ctx.request.query.token == session.get('data').registerValidateKey) {
        message = '账号认证失败!';
      }

      if (message  !== '') {
        this.sessionService().update(session.id, {data: ''});
        return ctx.render('common/error/user-verify.twig', {
          message: message,
        });
      }
      await this.getUserService().update(session.get('data')['userId'], {locked: '0'});
      
      ctx.redirect('/login');
    }
  }

  emailExist(email) {
    return !(await this.getUserService().getByEmail(email)) ? false : true;
  }


  nicknameExist(nickname) {
    return !(await this.getUserService().getByNickname(nickname)) ? false : true;
  }

  _registerValidateEmailBody(user, domain, validateKey) {
    return `Hi, ${user.nickname}<br/>

    欢迎加入学无止境网!<br/>
    
    请点击下面的链接完成注册激活：<br/>
    
    <a href="${domain}/register/email/verify?token=${validateKey}" target="_blank">注册激活</a><br/>
    
    如果以上链接无法点击，请将上面的地址复制到你的浏览器(如IE)的地址栏中打开，该链接地址24小时内打开有效。<br/>
    
    <a href="${domain}" target="_blank">学无止境网</a><br/>
    
    (这是一封自动产生的email，请勿回复。)<br/>`
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