const BaseService = require('koa-symphony/src/service/BaseService.js');

class SettingService extends BaseService{
  constructor(){
    super();
  }

  create(fields) {
    return this.getCurrentDao().create(fields);
  }

  getCurrentDao() {
    return this.createDao('setting/SettingDao');
  }
}

module.exports = new SettingService();