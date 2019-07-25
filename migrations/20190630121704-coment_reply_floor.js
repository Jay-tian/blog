'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE comments ADD COLUMN replyFloor int(11) unsigned NOT NULL DEFAULT 1  COMMENT '回复楼层';
      `
    );
  },

  down: (queryInterface) => {
    queryInterface.sequelize.query(
      'ALTER TABLE `comments` DROP `replyFloor`;'
    );
  }
};
