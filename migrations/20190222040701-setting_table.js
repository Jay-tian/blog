'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS setting (
        id int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
        name varchar(128) default '' COMMENT '名称',
        value blob NOT NULL COMMENT '值',
        createdAt datetime(0)  NOT NULL,
        updatedAt datetime(0) NOT NULL,
        PRIMARY KEY (id)
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;`
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('setting');
  }
};
