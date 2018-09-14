const BaseDao = require('koa-symphony/src/dao/user/UserDao.js');

class UserDao extends BaseDao{
  constructor(){
    super('user');
  }
}

module.exports = new UserDao();