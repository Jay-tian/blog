'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `CREATE TABLE comments IF NOT EXISTS (
        id int(10) NOT NULL AUTO_INCREMENT COMMENT '评论id',
        targetId int(10) NOT NULL COMMENT '评论目标id',
        targetType varchar(32) NOT NULL COMMENT '评论目标类型',
        replyId int(10) NOT NULL DEFAULT 0 COMMENT '回复id',
        postNum int(11) DEFAULT 0 COMMENT '回复的数量',
        userId varchar(32) NOT NULL COMMENT '评论者id',
        likeNum int(11) DEFAULT '0' COMMENT '点赞的数量',
        content varchar(512) DEFAULT NULL COMMENT '评论内容',
        createdAt datetime(0)  NOT NULL COMMENT '创建时间',
        updatedAt datetime(0) NOT NULL COMMENT '更新时间',
        PRIMARY KEY (id),
      ) ENGINE=InnoDB COMMENT='评论主表';
      `
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('setting');
  }
};
