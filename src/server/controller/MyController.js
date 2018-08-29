const BaseController = require('koa-symphony/src/controller/BaseController');

class MyController extends BaseController {
  constructor(){
    super();
  }

  myArticles() {
    return async (ctx) => {
      let user = ctx.state.user;
      let articles = await this.articleService().findArticlesByUserId(user.get('id'));
      return ctx.render('article/my-articles.twig', {
        articles: articles
      });
    };    
  }

  articleService() {
    return this.createService('article/ArticleService');
  }
}

module.exports = MyController;