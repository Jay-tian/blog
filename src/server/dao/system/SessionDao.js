const BaseDao = require('../BaseDao.js');
const Sequelize = require('sequelize');

class SessionDao extends BaseDao{
  constructor(){
    super('session');
  }

  updateBySessId(sessId, fields) {
    return this.model.update(fields, {where: {sessId: sessId}});
  }

  getBySessId(sessId) {
    return this.model.findOne({where : {sessId: sessId}});
  }

  config() {
    return {
      sessId: {
        type:Sequelize.STRING(128),
        unique: true,
        get: function(name) {
          let sessId = this.getDataValue(name);
          return sessId ? this.getDataValue(name).toString() : '';
        }
      },
      data: {
        type:Sequelize.BLOB,
        get: function(name) {
          let data = this.getDataValue(name);
          return data ? JSON.parse(data.toString()) : {};
        }
      },
      deadline: {
        type:Sequelize.INTEGER,
        allowNull: false,
      },
    };
  }
}

module.exports = new SessionDao();