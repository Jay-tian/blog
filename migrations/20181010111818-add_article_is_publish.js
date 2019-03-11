'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE article ADD COLUMN isPublish tinyint(1) unsigned NOT NULL DEFAULT '0'  COMMENT '是否发布' after publishedTime
      `
    );
  },

  down: (queryInterface) => {
    queryInterface.sequelize.query(
      'ALTER TABLE `article` DROP `isPublish`;'
    );
  }
};