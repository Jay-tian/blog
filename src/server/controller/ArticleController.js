const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkit = require('koa-symphony/src/toolkit/index.js');

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

      return ctx.render('article/create.twig', {});
    };
  }

  showArticle() {
    return async (ctx) => {
      let article = await this.articelService().getById(ctx.params.id);
      return ctx.render('article/show.twig', {
        article: article,
      });
    };
  }

  updateArticle() {
    return async (ctx) => {
      let article = await this.articelService().getById(ctx.params.id);
      return ctx.render('article/create.twig', {
        article: article,
      });
    };
  }

  articelService()
  {
    return this.createService('article/ArticleService');
  }
}

module.exports = DefaultController;