const mytoolkit = require('../toolkit/Toolkit');
const createService = function(name) {
    return global.symphony.service.load('service', name);
};

module.exports = {
    findComments: async function(targetId, targetType, start = 0, limit = 20, replyId = 0) {
        let commentService = createService('comment/CommentService');
        let comments = await commentService.search(
            {targetId: targetId, targetType: 'article', replyId: replyId },
            [['createdAt', 'DESC']],
            start,
            limit
        );

        // let userIds = toolkit.arrayColumn(comments, 'userId');
        // let users = await getUserService().findByIds(userIds);
        // users = mytoolkit.index(users, 'id');
        
        return {
            //comments: comments,
           // users: users,
        }
    }
};