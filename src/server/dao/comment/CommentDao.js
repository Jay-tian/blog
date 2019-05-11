const BaseDao = require('koa-symphony/src/dao/BaseDao.js');
const Sequelize = require('sequelize');

class CommentDao extends BaseDao {
  constructor(){
    super('comment');
  }



  config() {
    return {
      targetId: {
        type: Sequelize.INTEGER,
      },
      subTittargetTypele: {
        type: Sequelize.STRING(32),
      },
      replyId: {
        type: Sequelize.INTEGER,
      },
      postNum: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      likeNum: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING(512),
      },
    }
  }
}

module.exports = new CommentDao();