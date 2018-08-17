const BaseController = require('koa-symphony/src/controller/BaseController');

class DefaultController extends BaseController {
  constructor(){
    super();
  }

  index() {
    return async (ctx) => {
      return ctx.render('index/index.twig');
    };
  }
}

module.exports = DefaultController;