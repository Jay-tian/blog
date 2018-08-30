const BaseSessionService = require('koa-symphony/src/service/system/SessionService.js');

class SessionService extends BaseSessionService {
  constructor(){
    super();
  }
}

module.exports = new SessionService();