const mytoolkit = require('../toolkit/Toolkit');
const toolkit = require('koa-symphony/src/toolkit/index.js');

const createService = function(name) {
    return global.symphony.service.load('service', name);
};

module.exports = {
    findComments: async function(targetId, targetType, start = 0, limit = 20, replyId = 0) {
        let commentService = createService('comment/CommentService');
        let userService = createService('user/UserService');
        let comments = await commentService.search(
            {targetId: targetId, targetType: 'article', replyId: replyId },
            [['createdAt', 'DESC']],
            start,
            limit
        );

        let userIds = toolkit.arrayColumn(comments, 'userId');
        let users = await userService.findByIds(userIds);
        users = mytoolkit.index(users, 'id');
        
        return {
            comments: comments,
            users: users,
        }
    }
};