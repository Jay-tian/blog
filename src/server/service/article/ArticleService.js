const BaseService = require('koa-symphony/src/service/BaseService.js');

class ArticleService extends BaseService{
  constructor(){
    super();
  }

  create(fields) {
    return this.getCurrentDao().create(fields);
  }

  findArticlesByUserId(userId) {
    return this.getCurrentDao().findByUserId(userId);
  }

  getCurrentDao() {
    return this.createDao('article/ArticleDao');
  }
}

module.exports = new ArticleService();