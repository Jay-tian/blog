'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `CREATE TABLE album (
        id int(10) NOT NULL AUTO_INCREMENT COMMENT '专辑id',
        name int(10) NOT NULL COMMENT '专辑名称',
        date varchar(32) NOT NULL COMMENT '发行日期',
        singerId int(10) NOT NULL DEFAULT 0 COMMENT '歌手id',
        createdAt datetime(0)  NOT NULL COMMENT '创建时间',
        updatedAt datetime(0) NOT NULL COMMENT '更新时间',
        PRIMARY KEY (id)
      ) ENGINE=InnoDB COMMENT='专辑表';
      CREATE TABLE singer (
        id int(10) NOT NULL AUTO_INCREMENT COMMENT '歌手id',
        name int(10) NOT NULL COMMENT '歌手名',
        gender varchar(32) NOT NULL COMMENT '性别',
        createdAt datetime(0)  NOT NULL COMMENT '创建时间',
        updatedAt datetime(0) NOT NULL COMMENT '更新时间',
        PRIMARY KEY (id)
      ) ENGINE=InnoDB COMMENT='歌手表';
      CREATE TABLE music (
        id int(10) NOT NULL AUTO_INCREMENT COMMENT '歌曲id',
        name int(10) NOT NULL COMMENT '歌曲名',
        albumId varchar(32) NOT NULL DEFAULT 0 COMMENT '专辑名称',
        singerId int(10) NOT NULL DEFAULT 0 COMMENT '歌手id',
        createdAt datetime(0)  NOT NULL COMMENT '创建时间',
        updatedAt datetime(0) NOT NULL COMMENT '更新时间',
        PRIMARY KEY (id)
      ) ENGINE=InnoDB COMMENT='歌曲表';
      `
    );
  },

  down: (queryInterface) => {
    queryInterface.sequelize.query(
      'DROP TABLE `music`;DROP TABLE `singer`;DROP TABLE `album`;'
    );
  }
};
