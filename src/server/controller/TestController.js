const BaseController = require('koa-symphony/src/controller/BaseController');

class TestController extends BaseController {
  constructor(){
    super();
  }

  test() {
    return async (ctx) => {
      return ctx.render('common/system/test.twig', {
      });
    };
  }
}

module.exports = TestController;