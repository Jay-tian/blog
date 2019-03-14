'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `CREATE TABLE session (
          id int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "主键" ,
          sessId varbinary(128) NOT NULL,
          data blob NOT NULL,
          deadline int(10) UNSIGNED NOT NULL,
          createdAt datetime(0)  NOT NULL,
          updatedAt datetime(0) NOT NULL,
          UNIQUE KEY (sessId),
          PRIMARY KEY (id)
        ) ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('session');
  }
};
