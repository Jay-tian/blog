const BaseService = require('koa-symphony/src/service/BaseService.js');

class ArticleService extends BaseService{
  constructor(){
    super();
  }

  async tryManage(id, currentUser) {
    let article = await this.getCurrentDao().getById(id);
    if (currentUser.isAdmin() || article.userId == currentUser.getUserId()) {
      return article;
    }

    throw new Error('你无权修改！');
  }

  async update(id, fields) {
    await this.getCurrentDao().update(id, fields);
    return this.getCurrentDao().getById(id);
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