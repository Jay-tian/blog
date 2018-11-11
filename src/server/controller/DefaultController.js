const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkit = require('koa-symphony/src/toolkit/index.js');
const mytoolkit = require('../toolkit/Toolkit');
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
      let articles = await this.articleService().search({'isPublish': 1}, [['id', 'DESC']], 0, 20);
      let userIds = toolkit.arrayColumn(articles, 'userId', 'dataValues');
      let users = await this.getUserService().findByIds(userIds);
      users = mytoolkit.index(users, 'id');
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