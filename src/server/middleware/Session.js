const session = require('koa-session');
const toolkit = require('../../common/toolkit.js');

class Store {
  constructor() {
    this.sessionDao = global.service.load('dao', 'system/sessionDao.js');
  }

  async get(sid) {
    let result = await this.sessionDao.getBySessId(sid);
    if (!result) {
      return;
    }

    result = {
      id: result.dataValues['id'],
      deadline: result.dataValues['deadline'],
      sessId: result.get('sessId'),
      data: result.get('data'),
      userId: result.get('data').userId|0,
    };

    return result;
  }

  async set(session, opts = {}) {
    let result = await this.sessionDao.getBySessId(session);
    if (result) {
      let data = result.get('data');
      data = JSON.stringify(Object.assign(data, opts.data));
      
      return this.sessionDao.updateBySessId(session, {data: data});
    }

    let data = {
      userId: 0,
    };
    let sess = {
      sessId: session,
      deadline: parseInt(opts._expire / 1000) + opts._maxAge,
      data: JSON.stringify(Object.assign(data, opts.data)),
    };

    return this.sessionDao.create(sess);
  }

  async destroy(sid) {
  }
}

const CONFIG = {
  key: 'SESSID',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: false,
  rolling: false,
  store: new Store(),
};

module.exports = function (app) {
  app.use(session(CONFIG, app));
};

