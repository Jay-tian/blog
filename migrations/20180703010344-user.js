'use strict';

module.exports = {
  up: (queryInterface) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS user(
      id int(11) NOT NULL COMMENT '用户ID' AUTO_INCREMENT,
      email varchar(128) NOT NULL COMMENT '用户邮箱',
      password varchar(64) NOT NULL COMMENT '用户密码',
      salt varchar(32) NOT NULL COMMENT '密码SALT',
      nickname varchar(64) NOT NULL COMMENT '用户名',
      roles varchar(255) NOT NULL COMMENT '用户角色',
      locked tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否被禁止',
      lockDeadline int(10) not null default '0' COMMENT '帐号锁定期限',
      loginTime int(11) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
      loginIp varchar(64) NOT NULL DEFAULT '' COMMENT '最后登录IP',
      registerIp varchar(64) NOT NULL DEFAULT '' COMMENT '注册IP',
      registerTime int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
      createdAt datetime(0) COMMENT '创建时间',
      updatedAt datetime(0) COMMENT '最后更新时间',
      PRIMARY KEY (id),
      UNIQUE KEY (email),
      UNIQUE KEY (nickname)
      ) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET= utf8;`
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('User');
  }
};
