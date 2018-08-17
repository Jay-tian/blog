const BaseService = require('koa-symphony/src/service/BaseService.js');

class ArticleService extends BaseService{
  constructor(){
    super();
  }

  create(fields) {
    this.getCurrentDao().create(fields);
  }

  getCurrentDao() {
    return this.createDao('article/ArticleDao');
  }
}

module.exports = new ArticleService();