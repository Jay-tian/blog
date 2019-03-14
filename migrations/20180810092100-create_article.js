'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS article (
        id int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
        title varchar(128) NOT NULL COMMENT '标题',
        subTitle varchar(255) NOT NULL COMMENT '副标题',
        categoryId int(11) NOT NULL default '0' COMMENT '分类',
        status varchar(64) NOT NULL default 'create' COMMENT '状态',
        cover varchar(1024) not null default '' COMMENT '封面',
        userId int(11) not null COMMENT '用户',
        likeNum int(11) not null default '0' COMMENT '被赞数',
        hits int(11) not null default 0 COMMENT '浏览量',
        content text not null COMMENT '内容',
        contentMd text not null COMMENT '内容md',
        seq int(11) not null default 0 COMMENT '推荐权重',
        publishedTime int(10) UNSIGNED NOT NULL,
        createdAt datetime(0)  NOT NULL,
        updatedAt datetime(0) NOT NULL,
        PRIMARY KEY (id)
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;`
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('article');
  }
};
