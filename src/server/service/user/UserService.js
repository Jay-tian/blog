const BaseService = require('../BaseService.js');
const crypto = require('crypto');
const toolkit = require('../../../common/toolkit.js');

class UserService extends BaseService{
  constructor(){
    super();
  }

  // 加密方式抽离，支持重写
  async reigster(fields) {
    let salt =  crypto.randomBytes(16).toString('hex');
    let signture = crypto.createHmac('sha1', salt);//定义加密方式
    let password = signture.update(fields.password).digest().toString('base64');
    let user = {
      nickname: fields.nickname,
      password: password,
      salt: salt,
      roles: '|user|',
      registerIp: fields.registerIp,
      email: Math.random().toString(36).substr(2)+'0627@qq.com',
      loginIp: fields.registerIp,
      registerTime: toolkit.timestamp(),
    }; 

    return await this.getCurrentDao().create(user);
  }

  async login(fields) {
    let user = await this.getCurrentDao().getByNickname(fields.nickname);
    if (!user) {
      return;
    }

    let signture = crypto.createHmac('sha1', user.get('salt'));//定义加密方式
    return user.password == signture.update(fields.password).digest().toString('base64') ? user : null;  
  }

  getCurrentDao() {
    return this.createDao('user/UserDao');
  }

  getSessionDao() {
    return this.createDao('system/SessionDao');
  }
}

module.exports = new UserService();