const BaseDao = require('koa-symphony/src/dao/user/BaseDao.js');

class UserDao extends BaseDao{
  constructor(){
    super('user');
  }
}

module.exports = new UserDao();