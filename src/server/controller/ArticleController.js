const BaseController = require('./BaseController');
const toolkit = require('koa-symphony/src/common/toolkit.js');

class DefaultController extends BaseController {
  constructor(){
    super();
  }

  createArticle() {
    return async (ctx) => {
      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        body.userId = ctx.state.user.getUserId();
        body.content = body['content-html-code'];
        body.publishedTime = toolkit.timestamp();
        this.articelService().create(ctx.request.body);
      }

      return ctx.render('article/create.twig', {
        user: ctx.state.user
      });
    };
  }

  articelService()
  {
    return this.createService('article/ArticleService');
  }
}

module.exports = DefaultController;