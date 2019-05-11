const BaseService = require('koa-symphony/src/service/BaseService.js');

class CommentService extends BaseService {
  constructor() {
    super();
  }

  create(fields) {
    return this.getCurrentDao().create(fields);
  }

  reply(id, fields) {
    fields['replyId'] = id;
    return this.getCurrentDao().create(fields);
  }

  async delete(id, currentUser) {
    let comment = await this.getCurrentDao().getById(id);
    if (comment.userId == currentUser.getUserId()) {

      return this.getCurrentDao().delete(id);
    }

    throw new Error('您只能删除自己的评论！');
  }

  getCurrentDao() {
    return this.createDao('comment/CommentDao');
  }

}

module.exports = new CommentService();