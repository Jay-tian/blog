const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkit = require('koa-symphony/src/toolkit/index.js');

class DefaultController extends BaseController {
  constructor(){
    super();
  }

  index() {
    return async (ctx) => {
      let articles = await this.articleService().search({}, [['id', 'DESC']], 0, 20);
      
      return ctx.render('index/index.twig', {
        user: ctx.state.user,
        articles: articles,
      });
    };
  }

  articleService() {
    return this.createService('Article/ArticleService');
  }
}

module.exports = DefaultController;