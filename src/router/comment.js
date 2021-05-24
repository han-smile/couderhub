const Router = require('koa-router')

const { create, reply, update, remove, detail } = require('../controller/comment')
const { verifyAuth, verifyPremission } = require('../middleware/auth')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)
// 回复评论
commentRouter.post('/:commentId', verifyAuth, reply)
// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPremission, update)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPremission, remove)

module.exports = commentRouter