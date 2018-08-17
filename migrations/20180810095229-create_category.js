'use strict';

module.exports = {
  up: (queryInterface) => {
    queryInterface.sequelize.query(
      `
      CREATE TABLE IF NOT EXISTS category (
      id int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
      parentId int(11) NOT NULL COMMENT '父Id',
      name varchar(255) not null comment '名称',
      code varchar(255) not null comment '编码，便于查询所有子分类',
      seq int(11) not null default 0 COMMENT '推荐权重',
      createTime int(11) not null default 0 COMMENT '创建时间',
      createdAt datetime(0)  NOT NULL,
      updatedAt datetime(0) NOT NULL,
      PRIMARY KEY (id)
      ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;`
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('category');
  }
};
