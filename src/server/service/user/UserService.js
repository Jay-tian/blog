const baseUserService = require('koa-symphony/src/service/user/UserService.js');

class UserService extends baseUserService{
  constructor(){
    super();
  }
}

module.exports = new UserService();