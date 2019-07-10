const BaseController = require('koa-symphony/src/controller/BaseController');
const toolkitWeb = require('koa-symphony/src/toolkit/web.js');
const toolkit = require('koa-symphony/src/toolkit/index.js');
const mytoolkit = require('../toolkit/Toolkit');

class DefaultController extends BaseController {
  constructor(){
    super();
  }

  unPublishArticle() {
    return async (ctx) => {
      let user = ctx.state.user;
      if (!user.isAdmin()) {
        throw new Error('无权发布！');
      }

      this.articelService().unPublish(ctx.params.id);
      ctx.body = {
        success: 1,
      };

      return;
    };
  }

  publishArticle() {
    return async (ctx) => {
      let user = ctx.state.user;
      if (!user.isAdmin()) {
        throw new Error('无权发布！');
      }

      this.articelService().publish(ctx.params.id);
      ctx.body = {
        success: 1,
      };

      return;
    };
  }

  createArticle() {
    return async (ctx) => {
      if (!ctx.state.user.isLogin()) {
        throw new Error('请先登录！');
      }

      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        body.userId = ctx.state.user.getUserId();
        body.content = body['content-html-code'];
        body.publishedTime = toolkit.timestamp();
        let article = await this.articelService().create(ctx.request.body);
        let url = toolkitWeb.urlGenerater('updateArticle', { id: article.id });
        ctx.redirect(url);
        return;
      } else {
        return ctx.render('article/create.twig', {});
      }
    };
  }

  showArticle() {
    return async (ctx) => {
      let article = await this.articelService().getById(ctx.params.id);
      if (!article) {
        throw new Error('NOT FOUND'); 
      }

      if (!article['isPublish'] && ctx.state.user.getUserId() != article['userId']) {
        throw new Error('NOT FOUND'); 
      }
      
      if (ctx.state.user.getUserId() != article['userId']) {
        this.articelService().incrementHits(ctx.params.id);
      }

      let targetId = ctx.params.id;
      let comments = await this.commentService().search(
        {targetId: targetId, targetType: 'article', replyId: 0 },
        [['createdAt', 'DESC']],
        0,
        50
      );


      let replyIds = toolkit.arrayColumn(comments, 'replyId', 'dataValues');
      let replys = await this.commentService().findByIds(replyIds);

      let commentUserIds = toolkit.arrayColumn(comments, 'userId');
      let commentReplyUserIds = toolkit.arrayColumn(replys, 'userId');

      let userIds = commentUserIds.concat(commentReplyUserIds);
      let users = await this.getUserService().findByIds(userIds);
      users = mytoolkit.index(users, 'id');
      replys = mytoolkit.index(replys, 'id');

      return ctx.render('article/show.twig', {
        article: article,
        comments: comments,
        replys: replys,
      //  users: users,
      });
    };
  }

  updateArticle() {
    return async (ctx) => {
      let article = await this.articelService().tryManage(ctx.params.id, ctx.state.user);

      if ('POST' == ctx.request.method) {
        let body = ctx.request.body;
        body.content = body['content-html-code'];
        article = await this.articelService().update(body['id'], body);
      }

      return ctx.render('article/create.twig', {
        article: article,
      });
    };
  }

  // waveViewTimes() {
  //   return async (ctx) => {
  //     let body = ctx.request.body;
  //     article = await this.articelService().update(body['id'], body);
  //   };
  // }

  updateArticleCover() {
    return async (ctx) => {
      await this.articelService().tryManage(ctx.params.id, ctx.state.user);
      let body = ctx.request.body;
      this.articelService().update(ctx.params.id, {cover: body['cover']});
      ctx.body = {
        success: 1,
        message: '文章封面更新成功'
      }
      
      return;
    }
  }

  deleteArticle() {
    return async (ctx) => {
      await this.articelService().tryManage(ctx.params.id, ctx.state.user);
      await this.articelService().delete(ctx.params.id);
      ctx.body = {message: '删除成功', success: 1};
      return;
    };
  }

  articelService() {
    return this.createService('article/ArticleService');
  }

  commentService() {
    return this.createService('comment/CommentService');
  }
}

module.exports = DefaultController;