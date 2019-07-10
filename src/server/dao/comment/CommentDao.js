const BaseDao = require('koa-symphony/src/dao/BaseDao.js');
const Sequelize = require('sequelize');

class CommentDao extends BaseDao {
  constructor(){
    super('comments');
  }

  getLastFloor(targetId, targetType) {
    return this.db.query('select * from comments where targetId = ? and targetType = ? order by floor desc limit 1',
    {replacements: [targetId, targetType], type: this.db.QueryTypes.SELECT});
  }

  getLastReplyFloor(targetId, targetType, replyId) {
    return this.db.query('select * from comments where targetId = ? and targetType = ? and replyId = ? order by floor desc limit 1',
    {replacements: [targetId, targetType, replyId], type: this.db.QueryTypes.SELECT});
  }

  findBytargetIdAndTargetType(targetId, targetType) {
    return this.model.findAll({
      where: {
        targetId: targetId,
        targetType: targetType,
      },
      offset: 0,
      limit: 10
    });
  }

  config() {
    return {
      targetId: {
        type: Sequelize.INTEGER,
      },
      targetType: {
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
      floor: {
        type: Sequelize.INTEGER,
      },
      replyFloor: {
        type: Sequelize.INTEGER,
      }
    }
  }
}

module.exports = new CommentDao();