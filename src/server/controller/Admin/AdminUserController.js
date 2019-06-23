const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkit = require('koa-symphony/src/toolkit/index.js');

class AdminUserController extends BaseController {
  constructor(){
    super();
  }

  userManage() {
    return async (ctx) => {
        let users = await this.getUserService().search({}, [['id', 'DESC']], 0, 20);
        return ctx.render('admin/user/index.twig', {
            users: users,
        });
    };
  }
}

module.exports = AdminUserController;