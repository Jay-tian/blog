const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkitWeb = require('koa-symphony/src/toolkit/web.js');
const toolkit = require('koa-symphony/src/toolkit/index.js');

class DefaultController extends BaseController {
  constructor(){
    super();
  }

  createArticle() {
    return async (ctx) => {
      if (!ctx.state.user.isLogin()) {
        throw new Error('请先登录！');
      }
      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        body.userId = ctx.state.user.getUserId();
        body.content = body['content-html-code'];
        body.publishedTime = toolkit.timestamp();
        let article = await this.articelService().create(ctx.request.body);
        let url = toolkitWeb.urlGenerater('updateArticle', { id: article.id });
        ctx.redirect(url);
        return;
      } else {
        return ctx.render('article/create.twig', {});
      }
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
      let article = await this.articelService().tryManage(ctx.params.id, ctx.state.user);

      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        body.content = body['content-html-code'];
        article = await this.articelService().update(body['id'], body);
      }

      return ctx.render('article/create.twig', {
        article: article,
      });
    };
  }

  deleteArticle() {
    return async (ctx) => {
      await this.articelService().tryManage(ctx.params.id, ctx.state.user);
      await this.articelService().delete(ctx.params.id);
      ctx.body = {message: '删除成功', success: 1};
      return;
    };
  }

  articelService() {
    return this.createService('article/ArticleService');
  }
}

module.exports = DefaultController;