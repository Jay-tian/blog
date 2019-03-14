const BaseDao = require('koa-symphony/src/dao/BaseDao.js');
const Sequelize = require('sequelize');

class SettingDao extends BaseDao{
  constructor(){
    super('setting');
  }

  config() {
    return {
      name: {
        type: Sequelize.STRING(128),
      },
      value: {
        type: Sequelize.BLOB(),
      },
    };
  }
}

module.exports = new SettingDao();