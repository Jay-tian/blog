const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkit = require('koa-symphony/src/toolkit/index.js');
const userTookit = require('../toolkit/UserToolkit');
class DefaultController extends BaseController {
  constructor(){
    super();
  }

  index() {
    return async (ctx) => {
      let articles = await this.articleService().search({}, [['id', 'DESC']], 0, 20);
      let userIds = toolkit.arrayColumn(articles, 'userId', 'dataValues');
      let users = await this.getUserService().findByIds(userIds);
      users = userTookit.filter(users);
      return ctx.render('index/index.twig', {
        user: ctx.state.user,
        articles: articles,
        users: users,
      });
    };
  }

  articleService() {
    return this.createService('Article/ArticleService');
  }
}

module.exports = DefaultController;