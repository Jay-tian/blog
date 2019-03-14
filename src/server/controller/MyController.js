const BaseController = require('koa-symphony/src/controller/BaseController');
const Pagination = require('../toolkit/Pagination');

class MyController extends BaseController {
  constructor(){
    super();
  }

  myArticles() {
    return async (ctx) => {
      let user = ctx.state.user;
      let count = await this.articleService().count({userId: user.get('id')});
      // 中间件处理
      if (!ctx.request.query.page) {
        ctx.request.query.page = 1;
      }

      let articles = await this.articleService().findArticlesByUserId(user.get('id'), (ctx.request.query.page - 1) * Pagination.pageCount, Pagination.pageCount);
      let pagination = new Pagination(ctx.request, count);

      return ctx.render('article/my-articles.twig', {
        articles: articles,
        pagination: pagination,
      });
    };    
  }

  articleService() {
    return this.createService('article/ArticleService');
  }
}

module.exports = MyController;