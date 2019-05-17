const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkitWeb = require('koa-symphony/src/toolkit/web.js');
const toolkit = require('koa-symphony/src/toolkit/index.js');

class Commentontroller extends BaseController {
  constructor(){
    super();
  }

  createComment() {
    return async (ctx) => {
      if (!ctx.state.user.isLogin()) {
        throw new Error('请先登录！');
      }

      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        body.userId = ctx.state.user.getUserId();
        let comment = await this.commentService().create(ctx.request.body);
        let url = toolkitWeb.urlGenerater('showArticle', { id: comment.targetId });
        ctx.redirect(url);
        return;
      }
    };
  }

  userService() {
    return this.createService('user/UserService');
  }

  commentService() {
    return this.createService('comment/CommentService');
  }

}

module.exports = Commentontroller;