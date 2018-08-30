const BaseDao = require('koa-symphony/src/dao/user/BaseDao.js');

class SessionDao extends BaseDao{
  constructor(){
    super('session');
  }
}

module.exports = new SessionDao();