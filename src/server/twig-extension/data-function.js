const mytoolkit = require('../toolkit/Toolkit');
const toolkit = require('koa-symphony/src/toolkit/index.js');

const createService = function(name) {
    return global.symphony.service.load('service', name);
};

module.exports = {
    findComments: async function(targetId, targetType, startPage = 1, replyId = 0, limit = 20) {
        let commentService = createService('comment/CommentService');
        let userService = createService('user/UserService');
        let comments = await commentService.search(
            {targetId: targetId, targetType: targetType, replyId: replyId },
            [['createdAt', 'DESC']],
            (startPage - 1) * limit,
            limit
        );

        let userIds = toolkit.arrayColumn(comments, 'userId');
        let users = await userService.findByIds(userIds);
        users = mytoolkit.index(users, 'id');
        
        return {
            comments: comments,
            users: users,
        }
    },
    countComments:  async function(targetId, targetType) {
        let commentService = createService('comment/CommentService');
        return await commentService.count(
            {targetId: targetId, targetType: targetType},
        );
    }
};