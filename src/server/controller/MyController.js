const BaseController = require('koa-symphony/src/controller/BaseController');

class MyController extends BaseController {
  constructor(){
    super();
  }

  myArticles() {
    return async (ctx) => {
      let user = ctx.state.user;
      let count = await this.articleService().count({userId: user.get('id')});
      let articles = await this.articleService().findArticlesByUserId(user.get('id'), 0, count);
      
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