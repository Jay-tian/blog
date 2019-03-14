const BaseDao = require('koa-symphony/src/dao/BaseDao.js');
const Sequelize = require('sequelize');

class ArticleDao extends BaseDao{
  constructor(){
    super('article');
  }
  
  incrementHits(id) {
    this.model.findById(id).then(article => {
      return article.increment('hits');
    });
  }

  findByUserId(userId, offset=0, limit=Math.max()) {
    return this.model.findAll({
      where: {
        userId: userId,
      },
      offset: offset,
      limit: limit
    });
  }
  
  config() {
    return {
      title: {
        type: Sequelize.STRING(128),
      },
      subTitle: {
        type: Sequelize.STRING(256),
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(64),
      },
      cover: {
        type: Sequelize.STRING(1024),
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      likeNum: {
        type: Sequelize.INTEGER,
      },
      hits: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      contentMd: {
        type: Sequelize.TEXT,
      },
      seq: {
        type: Sequelize.INTEGER,
      },
      publishedTime: {
        type: Sequelize.INTEGER,
      },
      isPublish: {
        type: Sequelize.BOOLEAN,
      }
    };
  }
}

module.exports = new ArticleDao();