const BaseDao = require('koa-symphony/src/dao/BaseDao.js');
const Sequelize = require('sequelize');

class UserDao extends BaseDao{
  constructor(){
    super('user');
  }

  getByNickname(nickname) {
    return this.model.findOne({where : {nickname: nickname}});
  }

  config() {
    return {
      email: {type:Sequelize.STRING(128),  unique: true },
      password: {type:Sequelize.STRING(64),  allowNull: false},
      salt: {type:Sequelize.STRING(32),  allowNull: false},
      nickname: {type:Sequelize.STRING(64),  allowNull: false, unique: true},
      roles: {
        type:Sequelize.STRING(255),
        allowNull: false,
        get: function(name) {
          let roles = this.getDataValue(name);
          
          return roles.replace(/(^\|*)|(\|*$)/g, '').split('|');
        }
      },
      locked: {type: Sequelize.BOOLEAN,  defaultValue: 0,},
      lockDeadline: {type: Sequelize.INTEGER,  defaultValue: 0,},
      loginTime: {type: Sequelize.INTEGER,  defaultValue: 0},
      loginIp: {type:Sequelize.STRING(64),  allowNull: false, defaultValue: ''},
      registerIp: { type:Sequelize.STRING(64),  allowNull: false},
      registerTime: {type: Sequelize.INTEGER,  defaultValue: 0,}
    };
  }
}

module.exports = new UserDao();