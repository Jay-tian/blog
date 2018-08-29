const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkit = require('koa-symphony/src/toolkit/index.js');
const daoTookit = require('../toolkit/DaoToolkit');
class DefaultController extends BaseController {
  constructor(){
    super();
  }

  coding() {
    return async (ctx) => {
      return ctx.render('common/system/coding.twig', {
      });
    };
  }

  index() {
    return async (ctx) => {
      let articles = await this.articleService().search({}, [['id', 'DESC']], 0, 20);
      let userIds = toolkit.arrayColumn(articles, 'userId', 'dataValues');
      let users = await this.getUserService().findByIds(userIds);
      users = daoTookit.index(users, 'id');
      return ctx.render('index/index.twig', {
        articles: articles,
        users: users,
      });
    };
  }

  articleService() {
    return this.createService('article/ArticleService');
  }
}

module.exports = DefaultController;