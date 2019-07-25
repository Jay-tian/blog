'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE comments ADD COLUMN floor int(11) unsigned NOT NULL DEFAULT 1  COMMENT '楼层';
      `
    );
  },

  down: (queryInterface) => {
    queryInterface.sequelize.query(
      'ALTER TABLE `comments` DROP `floor`;'
    );
  }
};
